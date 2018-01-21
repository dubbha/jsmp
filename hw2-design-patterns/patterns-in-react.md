[[<<<]](README.md)

- [Singleton](#singleton)
- [Factory](#factory)
- [Iterator](#iterator)
- [Module](#module)
- [Decorator](#decorator)
- [Proxy](#proxy)
- [Bridge](#bridge)
- [Object Pool](#object-pool)
- [Composite](#composite)



# Singleton

[react/src/renderers/dom/shared/ReactDOMFeatureFlags.js](https://github.com/facebook/react/blob/19c2649e020101fead96780a8208b6c31f50b42d/src/renderers/dom/shared/ReactDOMFeatureFlags.js#L14)
``` javascript
...
var ReactDOMFeatureFlags = {
  fiberAsyncScheduling: false,
  useCreateElement: true,
  useFiber: true,
};

module.exports = ReactDOMFeatureFlags;
```

[react/src/renderers/art/ReactART.js](https://github.com/facebook/react/blob/9510ecfc5e0f9b5029d2a8c08d0628f9488bd2f8/src/renderers/art/ReactART.js#L14)
``` javascript
...
const ReactDOMFeatureFlags = require('ReactDOMFeatureFlags');

module.exports = ReactDOMFeatureFlags.useFiber
  ? require('ReactARTFiber')
  : require('ReactARTStack');
```

[[UP]](#)

# Factory
[react/src/isomorphic/classic/element/ReactElement.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/isomorphic/classic/element/ReactElement.js#L271)
``` javascript
...
/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function(type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};
...
```

[react/src/isomorphic/classic/element/ReactDOMFactories.js](https://github.com/facebook/react/blob/72196da82915bee400edb1599d4223926aa2a8a0/src/isomorphic/classic/element/ReactDOMFactories.js#L14)
``` javascript
...
var ReactElement = require('ReactElement');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (__DEV__) {
  var ReactElementValidator = require('ReactElementValidator');
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  ...
};

...
```

[[UP]](#)

# Iterator

[react/src/shared/utils/getIteratorFn.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/shared/utils/getIteratorFn.js)
``` javascript
...
/* global Symbol */
var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable: ?any): ?() => ?Iterator<*> {
  var iteratorFn = maybeIterable &&
    ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
      maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}
...
```

[react/src/isomorphic/children/traverseAllChildren.js](https://github.com/facebook/react/blob/72196da82915bee400edb1599d4223926aa2a8a0/src/isomorphic/children/traverseAllChildren.js)
``` javascript
...
var getIteratorFn = require('getIteratorFn');
...
if (Array.isArray(children)) {
    ...
} else {
  var iteratorFn = getIteratorFn(children);
  if (iteratorFn) {
    if (__DEV__) {
      // Warn about using Maps as children
      ...
    }

    var iterator = iteratorFn.call(children);
    var step;
    var ii = 0;
    while (!(step = iterator.next()).done) {
      child = step.value;
      nextName = nextNamePrefix + getComponentKey(child, ii++);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext,
      );
    }
  }

...
```

[[UP]](#)

# Module
[react/src/isomorphic/React.js](https://github.com/facebook/react/blob/9510ecfc5e0f9b5029d2a8c08d0628f9488bd2f8/src/isomorphic/React.js#L9)
``` javascript
/**
 * ...
 *
 * @providesModule React
 */

...

var React = {

  ...

};

module.exports = React;
```

- [React custom module system](https://facebook.github.io/react/contributing/codebase-overview.html#custom-module-system)
- [fbjs](https://github.com/facebook/fbjs/tree/master/packages/fbjs#fbjs)


# Decorator
[react/src/renderers/shared/shared/event/SyntheticEvent.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/shared/shared/event/SyntheticEvent.js#L34)
``` javascript
/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null,
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget,
) {
    ...

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    ...
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null
    ? nativeEvent.defaultPrevented
    : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  return this;
}

Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function() {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  persist: function() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  isPersistent: emptyFunction.thatReturnsFalse,

  destructor: function() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (__DEV__) {
        ...
      } else {
        this[propName] = null;
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    if (__DEV__) {
      ...
    }
  },
});

SyntheticEvent.Interface = EventInterface;

if (__DEV__) {
  ...
}
/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function(Class, Interface) {
  var Super = this;

  var E = function() {};
  E.prototype = Super.prototype;
  var prototype = new E();

  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);

module.exports = SyntheticEvent;
```

[react/src/renderers/dom/shared/syntheticEvents/SyntheticUIEvent.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/dom/shared/syntheticEvents/SyntheticUIEvent.js#L14)
``` javascript
var SyntheticEvent = require('SyntheticEvent');
...
var UIEventInterface = {
  view: function(event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target.window === target) {
      return target;
    }

    var doc = target.ownerDocument;
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function(event) {
    return event.detail || 0;
  },
};
...
function SyntheticUIEvent(
  dispatchConfig,
  dispatchMarker,
  nativeEvent,
  nativeEventTarget,
) {
  return SyntheticEvent.call(
    this,
    dispatchConfig,
    dispatchMarker,
    nativeEvent,
    nativeEventTarget,
  );
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;
```

https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/dom/shared/syntheticEvents/SyntheticFocusEvent.js#L30
``` javascript
var SyntheticUIEvent = require('SyntheticUIEvent');
...
var FocusEventInterface = {
  relatedTarget: null,
};
...
function SyntheticFocusEvent(
  dispatchConfig,
  dispatchMarker,
  nativeEvent,
  nativeEventTarget,
) {
  return SyntheticUIEvent.call(
    this,
    dispatchConfig,
    dispatchMarker,
    nativeEvent,
    nativeEventTarget,
  );
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;
```

[[UP]](#)

# Proxy
[react/src/renderers/shared/shared/event/SyntheticEvent.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/shared/shared/event/SyntheticEvent.js#L22)
``` javascript
var isProxySupported = typeof Proxy === 'function';
...
  if (isProxySupported) {
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function(target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function(constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function(target, prop, value) {
            if (
              prop !== 'isPersistent' &&
              !target.constructor.Interface.hasOwnProperty(prop) &&
              shouldBeReleasedProperties.indexOf(prop) === -1
            ) {
              warning(
                didWarnForAddedNewProperty || target.isPersistent(),
                "This synthetic event is reused for performance reasons. If you're " +
                  "seeing this, you're adding a new property in the synthetic event object. " +
                  'The property is never released. See ' +
                  'https://fb.me/react-event-pooling for more information.',
              );
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          },
        });
      },
    });
```

[[UP]](#)

# Bridge
[react/src/renderers/native/ReactNativeBridgeEventPlugin.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/native/ReactNativeBridgeEventPlugin.js#L40)
``` javascript
var ReactNativeBridgeEventPlugin = {
  eventTypes: {...customBubblingEventTypes, ...customDirectEventTypes},

  /**
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
    topLevelType: string,
    targetInst: Object,
    nativeEvent: Event,
    nativeEventTarget: Object,
  ): ?Object {
    var bubbleDispatchConfig = customBubblingEventTypes[topLevelType];
    var directDispatchConfig = customDirectEventTypes[topLevelType];
    var event = SyntheticEvent.getPooled(
      bubbleDispatchConfig || directDispatchConfig,
      targetInst,
      nativeEvent,
      nativeEventTarget,
    );
    if (bubbleDispatchConfig) {
      EventPropagators.accumulateTwoPhaseDispatches(event);
    } else if (directDispatchConfig) {
      EventPropagators.accumulateDirectDispatches(event);
    } else {
      return null;
    }
    return event;
  },
};

module.exports = ReactNativeBridgeEventPlugin;
```

[react/src/renderers/shared/shared/event/EventPluginHub.js](https://github.com/facebook/react/blob/9c7cf20dd56a42fe417e6caa264e75058bf92911/src/renderers/shared/shared/event/EventPluginHub.js#L98)
``` javascript
var EventPluginHub = {
  ...
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  ) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          targetInst,
          nativeEvent,
          nativeEventTarget,
        );
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },
```

[[UP]](#)

# Object Pool
[react/src/shared/utils/PooledClass.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/shared/utils/PooledClass.js)
``` javascript
/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function(a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  invariant(
    instance instanceof Klass,
    'Trying to release an instance into a pool of a different type.',
  );
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

type Pooler = any;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function<T>(
  CopyConstructor: Class<T>,
  pooler: Pooler,
): Class<T> & {
  getPooled /* arguments of the constructor */(): T,
  release(): void,
} {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = (CopyConstructor: any);
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: (oneArgumentPooler: Pooler),
  twoArgumentPooler: (twoArgumentPooler: Pooler),
  threeArgumentPooler: (threeArgumentPooler: Pooler),
  fourArgumentPooler: (fourArgumentPooler: Pooler),
};

module.exports = PooledClass;
```

[react/src/renderers/shared/shared/event/SyntheticEvent.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/shared/shared/event/SyntheticEvent.js#L16)
``` javascript
var PooledClass = require('PooledClass');

...

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(
  ...
}

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);

module.exports = SyntheticEvent;
```

[react/src/renderers/shared/stack/reconciler/CallbackQueue.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/shared/stack/reconciler/CallbackQueue.js#L15)
``` javascript
var PooledClass = require('PooledClass');

...

class CallbackQueue<T> {
  ...
}

module.exports = PooledClass.addPoolingTo(CallbackQueue);
```

-[Object Pool Pattern](https://en.wikipedia.org/wiki/Object_pool_pattern)
-[Event Pooling](https://facebook.github.io/react/docs/events.html#event-pooling)

[[UP]](#)

# Composite
[react/src/isomorphic/children/ReactChildren.js](https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/isomorphic/children/ReactChildren.js#L18)
``` javascript
var traverseAllChildren = require('traverseAllChildren');
...
/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(
    forEachFunc,
    forEachContext,
  );
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}
...
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(
    array,
    escapedPrefix,
    func,
    context,
  );
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}
...
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
...
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}
...
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(
    children,
    result,
    null,
    emptyFunction.thatReturnsArgument,
  );
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray,
};

module.exports = ReactChildren;
```

[react/src/isomorphic/children/traverseAllChildren.js](https://github.com/facebook/react/blob/72196da82915bee400edb1599d4223926aa2a8a0/src/isomorphic/children/traverseAllChildren.js#L64)
``` javascript
function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext,
) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (
    children === null ||
    type === 'string' ||
    type === 'number' ||
    // The following is inlined from ReactElement. This means we can optimize
    // some checks. React Fiber also inlines this logic for similar purposes.
    (type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE)
  ) {
    callback(
      traverseContext,
      children,
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
    );
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext,
      );
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      ...
      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext,
        );
      }
    } else if (type === 'object') {
      var addendum = '';
      ...
      var childrenString = '' + children;
      invariant(
        false,
        'Objects are not valid as a React child (found: %s).%s',
        childrenString === '[object Object]'
          ? 'object with keys {' + Object.keys(children).join(', ') + '}'
          : childrenString,
        addendum,
      );
    }
  }

  return subtreeCount;
}

function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
```

[[UP]](#)

<!--

### Additional Task

module vs revealing module
observer vs pub-sub vs mediator
mvc vs mvp vs mvvm
builder vs abstract factory vs factory method

http://www.dofactory.com/
http://www.dofactory.com/javascript/adapter-design-pattern



# Observer
- Event system?
renderers/shared/shared/event/EventPluginHub.js
https://github.com/facebook/react/blob/4c292facc9fa176cd0a8a094b38fc1800650325f/src/renderers/dom/shared/ReactEventListener.js
https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/renderers/shared/stack/reconciler/CallbackQueue.js#L31

# Dependency Injection
- Context
https://github.com/krasimir/react-in-patterns/tree/master/patterns/dependency-injection

# Chain of responsibilty
- PropTypes ?

# ???
https://habrahabr.ru/post/250149/
роутер - медиатор
модули - модули
pubsub - eventepitter
адаптер - обратная совместимость с 2 версией
стратегия - любый инкапсулированне алгоритымы (pipe)
шаблонный метод - лайфсакл хуки
-->