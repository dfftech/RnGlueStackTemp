/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import './global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import RouterRoot from 'react-native-auto-route';
import { ColorMode } from './utils/services/app.event';
import { SafeAreaView } from './components/ui/safe-area-view';
import { useSignals } from '@preact/signals-react/runtime';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const App = () => {
	useSignals();
	return (
		<GluestackUIProvider mode={ColorMode.value as 'light' | 'dark'}>
			<SafeAreaView
				style={{
					flex: 1,
				}}>
				<RouterRoot theme={ColorMode.value === 'dark' ? NavigationDarkTheme : NavigationLightTheme} />
			</SafeAreaView>
		</GluestackUIProvider>
	);
};

export default App;

