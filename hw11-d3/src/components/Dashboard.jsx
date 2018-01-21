/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import FlatButton from 'material-ui/FlatButton';
import InsertChartIcon from 'material-ui/svg-icons/editor/insert-chart';
import PieChartIcon from 'material-ui/svg-icons/editor/pie-chart';
import LineChartIcon from 'material-ui/svg-icons/editor/show-chart';
import MultiLineChartIcon from 'material-ui/svg-icons/editor/multiline-chart';
import BubbleChartIcon from 'material-ui/svg-icons/editor/bubble-chart';
import TimelineIcon from 'material-ui/svg-icons/action/timeline';
import RadioButton, { RadioButtonGroup } from 'material-ui/RadioButton';
import uriPrefix from './uriPrefix';

// Helper functions
const date = (isoDate) => {
  const year = isoDate.toString().substr(0, 4);
  const month = isoDate.toString().substr(5, 2);
  return `${month}/${year}`;
};
const hours = seconds => seconds / 3600;

export default class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      city: 'kyiv',
      cityVisible: true,
      svg: null,
      outerWidth: 1200,
      outerHeight: 600,
      margin: { top: 20, right: 20, bottom: 50, left: 70 },
      showChartFn: null,
      forceData: null,
      nodeWeights: null,
      bubbleData: null,
    };
  }

  componentDidMount() {
    this.initBarChart();
  }

  render = () => (
    <div>
      <div>
        <svg style={{ border: '1px solid' }}>
        </svg>
      </div>
      <div>
        <FlatButton onClick={this.initBarChart} label="Bar Chart" icon={<InsertChartIcon />} />
        <FlatButton onClick={this.initPieChart} label="Pie Chart" icon={<PieChartIcon />} />
        <FlatButton onClick={this.initBubbleChart} label="Bubble Chart" icon={<BubbleChartIcon />} />
        <FlatButton onClick={this.initForceGraph} label="Force Graph" icon={<TimelineIcon />} />
      </div>
      <div className={this.state.cityVisible ? 'visible' : 'hidden'}>
        <RadioButtonGroup
          name="city"
          defaultSelected={this.state.city}
          onChange={this.onChangeCity}>
          <RadioButton
            value="kyiv"
            label="Kyiv"
          />
          <RadioButton
            value="san-diego"
            label="San Diego"
          />
        </RadioButtonGroup>
      </div>
    </div>
  )

  clear = () => d3.select('svg').selectAll('*').remove();

  onChangeCity = (e, v) =>
    this.setState({ ...this.state, city: v }, () =>
      this.getData(`${uriPrefix}/${this.state.city}-temp-mavg.json`, this.state.showChartFn));

  getData = (uri, callback = () => {}) => d3.json(uri, (res) => {
    const data = res.data.map(d => ({ month: date(d.sunrise), dayLength: d.day_length }));
    this.setState({ ...this.state, data }, callback);
  });

  getForceData = (uri, callback = () => {}) => d3.json(uri, (res) => {
    this.setState({ ...this.state, forceData: res }, callback);
  });

  // https://sunrise-sunset.org/api
  // https://api.sunrise-sunset.org/json?lat=50.4501&lng=30.5234&date=2016/06/22&formatted=0
  initBarChart = () => {
    if (!this.state.data) {
      this.getData(`${uriPrefix}/${this.state.city}-temp-mavg.json`, this.initBarChart);
      return;
    }

    this.clear();

    const outerWidth = this.state.outerWidth;
    const outerHeight = this.state.outerHeight;
    const margin = this.state.margin;

    this.svg = d3.select('svg')
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    this.svg.append('g')
        .attr('class', 'chart');

    this.setState({ ...this.state, showChartFn: this.showBarChart, cityVisible: true });
    this.showBarChart();
  }

  showBarChart = () => {
    const chart = this.svg.select('.chart');

    const outerWidth = this.state.outerWidth;
    const outerHeight = this.state.outerHeight;
    const margin = this.state.margin;

    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const data = this.state.data;
    const min = d3.min(data, d => hours(d.dayLength));
    const max = d3.max(data, d => hours(d.dayLength));

    chart.attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map(d => d.month));
    y.domain([0, max]);

    const barWidth = width / data.length;

    // eslint-disable-next-line
    const colors = ['#3800E5', '#4902CB', '#5B04B2', '#6C0698', '#7E087F', '#8F0B65', '#A10D4C', '#B20F32', '#C41119', '#D61400'];

    const bar = chart.selectAll('.bar')
      .data(data, d => d.month);

    bar
      .transition().duration(1000)
        .attr('x', d => x(d.month))
        .attr('y', d => y(hours(d.dayLength)))
        .attr('width', barWidth - 5)
        .attr('fill', d => colors[Math.floor(((hours(d.dayLength)) - min) / (((max - min) + 1) / colors.length))])
        .attr('height', d => height - y(hours(d.dayLength)));

    bar.exit()
      .remove();

    bar.enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.month))
        .attr('y', d => y(hours(d.dayLength)))
        .attr('height', d => height - y(hours(d.dayLength)))
        .attr('width', barWidth - 5)
        .attr('fill', d => colors[Math.floor(((hours(d.dayLength)) - min) / (((max - min) + 1) / colors.length))]);

    // Clear axis
    chart.selectAll('.axis').remove();

    // Add X axis
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'axis')
      .call(d3.axisBottom(x));

    // Add Y axis
    chart.append('g')
      .attr('transform', 'translate(0, 0)')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));

    // Clear text labels
    chart.selectAll('.label').remove();

    // Text label for the X axis
    chart.append('text')
      .attr('transform', `translate(${(width / 2)}, ${(height + margin.top + 20)})`)
      .attr('class', 'label')
      .style('text-anchor', 'middle')
      .text('MONTH');

    // Text label for the Y axis
    chart.append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', margin.left / 2)
      .style('text-anchor', 'middle')
      .text('DAY LENGTH');

    // Add Y axis units
    chart.append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - margin.top)
      .attr('dy', margin.left / 2)
      .attr('dx', -margin.top)
      .text('hours');
  }

  initPieChart = () => {
    this.clear();

    const outerWidth = this.state.outerWidth;
    const outerHeight = this.state.outerHeight;
    const margin = this.state.margin;

    this.svg = d3.select('svg')
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    this.svg.append('g')
        .attr('class', 'chart')
        .attr('transform', `translate(${outerWidth / 2}, ${outerHeight / 2})`);

    this.setState({ ...this.state, showChartFn: this.showPieChart, cityVisible: true });
    this.showPieChart();
  }

  showPieChart = () => {
    const chart = this.svg.select('.chart');

    const data = this.state.data;
    const min = d3.min(data, d => hours(d.dayLength));
    const max = d3.max(data, d => hours(d.dayLength));

    const pieData = d3.pie().value(d => hours(d.dayLength))(data);

    const arc = d3.arc()
      .outerRadius((this.state.outerHeight / 2) - 90)
      .innerRadius(0);
    const labelArc = d3.arc()
      .outerRadius(this.state.outerHeight / 2 - 20)
      .innerRadius(this.state.outerHeight / 2 - 20);

    const width = this.state.outerWidth;
    const height = this.state.outerHeight;

    const colors = ['#3800E5', '#4902CB', '#5B04B2', '#6C0698', '#7E087F', '#8F0B65', '#A10D4C', '#B20F32', '#C41119', '#D61400'];

    const pie = chart.selectAll('.arc')
      .data(pieData, d => d.data.month);

    pie.transition().duration(1000)
      .select('.path')
        .attr('fill', d => colors[Math.floor(((hours(d.data.dayLength)) - min) / (((max - min) + 1) / colors.length))])
        .attr('d', arc);

    pie.transition().duration(1000)
      .select('.label')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .text(d => `${hours(d.data.dayLength).toFixed(0)} hours, ${d.data.month}`);

    const g = pie.enter()
      .append('g')
        .attr('class', 'arc');
    
    g.append('path')
          .attr('class', 'path')
          .attr('fill', d => colors[Math.floor(((hours(d.data.dayLength)) - min) / (((max - min) + 1) / colors.length))])
          .attr('d', arc);

    g.append('text')
          .attr('class', 'label')
          .attr('transform', d => `translate(${labelArc.centroid(d)})`)
          .attr('dy', '.35em')
          .text(d => `${hours(d.data.dayLength).toFixed(0)}hours, ${d.data.month}`)
          .attr('text-anchor', 'middle');

    g.exit().remove();

    this.showChartFn = this.showPieChart;

  }

  initForceGraph = () => {
    if (!this.state.forceData) {
      this.getForceData(`${uriPrefix}/les-miserables.json`, this.initForceGraph);
      return;
    }

    this.clear();

    const outerWidth = this.state.outerWidth;
    const outerHeight = this.state.outerHeight;
    const margin = this.state.margin;

    this.svg = d3.select('svg')
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    this.svg.append('g')
        .attr('class', 'chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.svg.selectAll('.label').remove();
    this.svg.append('text')
      .attr('transform', `translate(10, 20)`)
      .attr('class', 'label')
      .text('LES MISERABLES');

    if (!this.state.nodeWeights) {
      const nodeWeight = (data, nodeId) => {
        return data.links.reduce((prev, cur, i, arr) => {
          if (cur.source === nodeId || cur.target === nodeId) {
            return prev + (cur.value / 2);
          }
          return prev;
        }, 0);
      }
      const nodeWeights = {};
      this.state.forceData.nodes.forEach((node) => {
        const weight = nodeWeight(this.state.forceData, node.id);
        nodeWeights[node.id] = weight;
      });

      this.setState({
        ...this.state,
        nodeWeights,
        showChartFn: this.showForceChart,
        cityVisible: false
      }, this.showForceChart);
    } else {
      this.setState({
        ...this.state,
        showChartFn: this.showForceChart,
        cityVisible: false
      }, this.showForceChart);
    }
  }

  showForceChart = () => {
    const width = this.state.outerWidth;
    const height = this.state.outerHeight;

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const ticked = () => {
      link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

      node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
    }

    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const graph = this.state.forceData;

    const link = this.svg.append('g')
        .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
        .attr('stroke-width', d => Math.sqrt(d.value));

    const maxWeight = 12;
    const minWeight = 3;
    const node = this.svg.append('g')
        .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter().append('circle')
        .attr('r', d => {
          if (this.state.nodeWeights[d.id] > maxWeight) return maxWeight;
          if (this.state.nodeWeights[d.id] < minWeight) return minWeight;
          return this.state.nodeWeights[d.id];
        })
        .attr('fill', d => color(d.group))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
      .text(d => d.id);

    simulation
      .nodes(graph.nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(graph.links);
  }

  initBubbleChart = () => {
    if (!this.state.forceData) {
      this.getForceData(`${uriPrefix}/les-miserables.json`, this.initBubbleChart);
      return;
    }

    this.clear();

    this.svg.selectAll('.label').remove();
    this.svg.append('text')
      .attr('transform', `translate(10, 20)`)
      .attr('class', 'label')
      .text('LES MISERABLES');

    if (!this.state.bubbleData) {
      const nodeWeight = (data, nodeId) => {
        return data.links.reduce((prev, cur, i, arr) => {
          if (cur.source === nodeId || cur.target === nodeId ||
              cur.source.id === nodeId || cur.target.id === nodeId) {
            return prev + (cur.value / 2);
          }
          return prev;
        }, 0);
      };
      const children = [];
      this.state.forceData.nodes.forEach((node) => {
        const value = nodeWeight(this.state.forceData, node.id);
        children.push({
          id: node.id,
          group: node.group,
          value,
        })
      });

      this.setState({
        ...this.state,
        bubbleData: { children },
        showChartFn: this.showBubbleChart,
        cityVisible: false
      }, this.showBubbleChart);
    } else {
      this.setState({
        ...this.state,
        showChartFn: this.showBubbleChart,
        cityVisible: false
      }, this.showBubbleChart);
    }
  }

  showBubbleChart = () => {
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const data = this.state.bubbleData;

    var pack = d3.pack()
      .size([this.state.outerWidth, this.state.outerHeight])
      .padding(1.5);

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    var node = this.svg.selectAll('.node')
      .data(pack(root).leaves())
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    node.append('circle')
      .attr('id', d => d.data.id)
      .attr('r', d => d.r)
      .attr('fill', d => color(d.data.group));

    node.append('clipPath')
        .attr('id', d => `clip-${d.data.id}`)
      .append('use')
        .attr('xlink:href', d => `#${d.data.id}`);

    node.append('text')
        .attr('clip-path', d => `url(#clip-${d.data.id})`)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(d => `${d.data.id}`);

    node.append("title")
        .text(d => d.data.id);
  }
}
