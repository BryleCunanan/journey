import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import AppLoading from "../components/AppLoading";
import {
  lightVioletTheme,
  darkBlueTheme,
  whiteBlackTheme,
  yellowPinkTheme,
  blueOrangeTheme,
} from "../assets/themes";

const themes = {
  lightViolet: lightVioletTheme,
  darkBlue: darkBlueTheme,
  whiteBlack: whiteBlackTheme,
  yellowPink: yellowPinkTheme,
  blueOrange: blueOrangeTheme,
};

const fonts = {
  Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  DMSerif: require("../assets/fonts/DMSerifDisplay-Regular.ttf"),
  Oswald: require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
  Josefin: require("../assets/fonts/JosefinSans-Regular.ttf"),
  Montserrat: require("../assets/fonts/Montserrat-Medium.ttf"),
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightVioletTheme);
  const [font, setFont] = useState("Poppins");
  const [fontSize, setFontSize] = useState(18); // Default to a number
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem("config_theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }

        const storedFont = await AsyncStorage.getItem("config_font");
        if (storedFont) {
          setFont(storedFont);
        }
        await loadAsync(fonts);
        setFontsLoaded(true);

        const storedFontSize = await AsyncStorage.getItem("config_font_size");
        if (storedFontSize) {
          setFontSize(parseInt(storedFontSize)); // Parse as an integer
        }
      } catch (error) {
        console.error("Error loading theme from AsyncStorage:", error);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async (themeKey) => {
    const newTheme = themes[themeKey];
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("config_theme", JSON.stringify(newTheme));
    } catch (error) {
      console.error("Error saving theme to AsyncStorage:", error);
    }
  };

  const changeFont = async (fontKey) => {
    setFont(fontKey);
    try {
      await AsyncStorage.setItem("config_font", fontKey);
    } catch (error) {
      console.error("Error saving font to AsyncStorage:", error);
    }
  };

  const changeFontSize = async (fontSizeKey) => {
    setFontSize(fontSizeKey); // Directly use the number
    try {
      await AsyncStorage.setItem("config_font_size", fontSizeKey.toString()); // Store as a string
    } catch (error) {
      console.error("Error saving font size to AsyncStorage:", error);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, font, changeFont, fontSize, changeFontSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
