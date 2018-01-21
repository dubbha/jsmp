import { TabsPage } from './tabs/tabs';
import { FlowersPage } from './flowers/flowers';
import { PetsPage } from './pets/pets';
import { SettingsPage } from './settings/settings';


// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = FlowersPage;
export const Tab2Root = PetsPage;
export const Tab3Root = SettingsPage;
