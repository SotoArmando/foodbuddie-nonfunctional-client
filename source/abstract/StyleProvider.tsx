import React, { createContext, useContext, ReactNode } from 'react';
import { StyleSheet, TextStyle, ViewStyle, ImageStyle, PixelRatio } from 'react-native';

import { Dimensions } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
// import { transform } from '../helpers/styleStringHelper';
import { SearchScreen, SearchScreenStyle } from './screensStyle/SearchScreen';
import { PrerenderedTextStyle, ScannerScreen, ScannerScreenStyle } from './screensStyle/ScannerScreen';
import { LoadingScreen, LoadingScreenStyle } from './screensStyle/LoadScreen';
import { AddManuallyIngredientScreen, AddManuallyIngredientScreenStyle } from './screensStyle/AddManuallyIngredientScreen';

function transform(x: number, y: number): string {
  return `translate(${scale(x)}px, ${scale(y)}px)`;
}

const { width, height } = Dimensions.get('window');

// Base screen dimensions (adjust these to match your design reference)
const baseWidth = 393;
const baseHeight = 852;
// (width / baseWidth) *  size
export const scale = (size: number) => {
  // console.log(width / baseWidth)
  return (width / baseWidth) * size;
};
const verticalScale = (size: number) => (height / baseHeight) * size;

const shouldNotScale = new Set([
  'fontWeight',
  'zIndex',
  'opacity',
  'elevation',
  'fontSize',
  'lineHeight',
  'letterSpacing'
]);

type StyleValue = number | string | object | undefined;
type ScalableStyle = { [key: string]: StyleValue | ScalableStyle };

/**
 * Recursively scales all numeric values in a style object.
 */
export const scaleStyles = <T extends ScalableStyle>(styles: T): T => {
  if (!styles || typeof styles !== 'object') return styles;

  return Object.keys(styles).reduce((scaledStyles, key) => {
    const value = styles[key];

    if (typeof value === 'number' && shouldNotScale.has(key) === false) {
      (scaledStyles as any)[key] = scale(value);
    } else if (typeof value === 'object') {
      (scaledStyles as any)[key] = scaleStyles(value as ScalableStyle); // Recursively scale nested styles
    } else {
      (scaledStyles as any)[key] = value; // Keep non-numeric values unchanged
    }

    if (styles.hasOwnProperty('anchor')) {
      (scaledStyles as any)[key] = value;
    }

    return scaledStyles;
  }, {} as T);
};

// Example Usage
// const rawStyles = {
//   container: {
//     width: 200,
//     height: 100,
//     padding: 16,
//     margin: 10,
//     fontWeight: 'bold', // Won't be scaled
//     opacity: 0.5, // Won't be scaled
//   },
//   text: {
//     fontSize: 14, // Will be scaled
//     fontWeight: '600', // Won't be scaled
//   },
// };

// const scaledStyles = scaleStyles(rawStyles);
// console.log(scaledStyles); // See the adjusted values

// Define style types for components
type ComponentStyles = {
  Common: {
    VirSpace0: ViewStyle;
  };
  Splash: {
    SplashScreen: ViewStyle;
    SplashComponent: ViewStyle;
    SplashLogoIcon: ViewStyle;
  };
  Onboarding: {
    OnboardingComponent: ViewStyle,
    OnboardingComponentSibling: ViewStyle,
    OnboardingScreener: ViewStyle,
    OnboardingTitle: TextStyle,
    OnboardingDescription: TextStyle,
    OnboardingPhaseDisplay: ViewStyle,
    OnboardingPhaseDisplayItem: ViewStyle,
    OnboardingMenu: ViewStyle,
    OnboardingMenu1: ViewStyle,
    OnboardingMenu1Label: TextStyle,
    OnboardingMenuSkip: TextStyle,
    OnboardingMenuNext: ViewStyle,
    OnboardingMenuNextIcon: ViewStyle
  },
  SignUp: {
    SignUpComplement: ViewStyle,
    SignUpTitle: TextStyle,
    SignUpSubTitle: TextStyle,
    SignUpScreener: ViewStyle,
    SignUpSocialButton: ViewStyle,
    SignUpSocialButtonLabel: TextStyle,
    SignUpSocialButtonIcon: ViewStyle,
    SignUpAgreementLabel: TextStyle,
    SignUpAgreementLabelMedium: TextStyle,
    SignUpComplementRowSibling: ViewStyle
  },
  Preferences1: {
    Preferences1Complement: ViewStyle,
    Preferences1RowSibling: ViewStyle,
    ProgressBar: ViewStyle,
    ProgressBarSibling: ViewStyle,
    ProgressBarSiblingChild: ViewStyle,
    ProgressBarLabelLeft: TextStyle,
    ProgressBarLabelContainer: ViewStyle,
    ProgressBarLabelRight: TextStyle,
    ProgressBarLabelBackbutton: ViewStyle,
    PreferencesTitle: TextStyle,
    PreferencesSubtitleContainer: ViewStyle,
    PreferencesSubtitle: TextStyle,
    PreferencesButtonCommonContainer: ViewStyle,
    PreferencesButtonCommon: ViewStyle,
    PreferencesButtonCommonSelected: ViewStyle,
    PreferencesButtonCommonSelectedLabel: TextStyle,
    PreferencesButtonCommonLabelContainer: ViewStyle,
    PreferencesButtonCommonLabelContainerNoIcon: ViewStyle,
    PreferencesButtonCommonLabel: TextStyle,
    PreferencesButtonCommonIcon: ViewStyle,
    PreferencesNextButton: ViewStyle,
    PreferencesNextButtonPressable: ViewStyle,
    PreferencesNextButtonLabel: TextStyle,
    TimePickerFieldContainer: ViewStyle,
    TimePickerField: ViewStyle,
    TimePickerFieldIcon: ViewStyle,
    TimePickerFieldLabel: TextStyle,
    TimePickerFieldTitle: TextStyle,
    TimePickerFieldTitleContainer: ViewStyle,
  },
  AllSet: {
    AllSetComponent: ViewStyle,
    AllSetComponentColSibling: ViewStyle,
    AllSetComponentColCommonSibling: ViewStyle,
    AllSetScreener: ViewStyle,
    AllSetTitle: TextStyle,
    AllSetIntroduction: TextStyle,
    AllSetIntroductionMargin: ViewStyle,
    AllSetButtonsContainer: ViewStyle,
    AllSetButtonCommon: ViewStyle,
    AllSetButtonCall: ViewStyle,
    AllSetButtonCallLabel: TextStyle,
    AllSetButtonCommonLabel: TextStyle,
    AllSetButtonCommonContainer: ViewStyle,
  },
  Home: {
    HomeComponent: ViewStyle,
    HomeHeadingRow: ViewStyle,
    HomeHeadingTitle: TextStyle,
    HomeHeadingDate: TextStyle,
    HomeHeadingIcon: TextStyle,
    HomeHeadingBellIcon: TextStyle,
    HomeUpcomingRow: ViewStyle,
    HomeUpcomingLabel: TextStyle,
    HomeUpcomingIcon: ViewStyle,
    HomeUpcomingMealColumn: ViewStyle,
    HomeUpcomingMealHeadingRow: ViewStyle
    HomeUpcomingMealHeadingRowTimeLabel: TextStyle,
    HomeUpcomingMealHeadingTimeIcon: ViewStyle
    HomeUpcomingMealHeadingHeartIcon: ViewStyle
    HomeUpcomingMealHeadingDotsIcon: ViewStyle,
    HomeUpcomingMealTitleRow: ViewStyle,
    HomeUpcomingMealTitleLabel: TextStyle,
    HomeUpcomingMealTitleIcon: ViewStyle,
    HomeUpcomingMealItemsRow: ViewStyle,
    HomeUpcomingMealItemsMealP: ViewStyle,
    HomeUpcomingMealItemsMeal: ViewStyle,
    HomeUpcomingMealItemsMealPicture: ViewStyle,
    HomeUpcomingMealItemsMealTitle: TextStyle,
    HomeUpcomingMealItemsMealCRow: ViewStyle,
    HomeUpcomingMealItemsMealCRowB: ViewStyle,
    HomeUpcomingMealItemsMealTimeLabel: TextStyle,
    HomeUpcomingMealItemsMealServeLabel: TextStyle,
    HomeUpcomingMealItemsMealIcon: ViewStyle,
    HomeUpcomingMealItemsMealIconB: ViewStyle,
    HomeUpcomingMealItemsMealIconC: ViewStyle,
    HomeQuickInventoryLabel: TextStyle,
    HomeQuickInventoryItemsContainer: ViewStyle,
    HomeQuickInventoryItemsQuickSummary: ViewStyle,
    HomeQuickInventoryItemsQuickSummarySmall: ViewStyle,
    HomeQuickInventoryItemsQuickSummaryTitle: TextStyle,
    HomeQuickInventoryItemsQuickSummaryTitleCenter: TextStyle,
    HomeQuickInventoryItemsQuickSummaryLabel: TextStyle,
    HomeQuickInventoryItemsQuickSummaryLabelRoundedContainer: ViewStyle,
    HomeQuickInventoryItemsQuickSummaryLabelRoundedContainerBig: ViewStyle,
    HomeLeftOverSuggestionsRow: ViewStyle,
    HomeLeftOverSuggestionsLabel: TextStyle,
    HomeLeftOverSuggestionsViewAllButton: ViewStyle,
    HomeLeftOverSuggestionsViewAllButtonLabel: TextStyle,
    HomeLeftOverSuggestionsViewAllButtonIcon: ViewStyle,
    HomeLeftOverSuggestionsMealsRow: ViewStyle,
    HomeLeftOverSuggestionsMealsItem: ViewStyle,
    HomeLeftOverSuggestionsMealsItemIconContainer: ViewStyle,
    HomeLeftOverSuggestionsMealsItemIcon: ViewStyle,
    HomeLeftOverSuggestionsMealsItemPicture: ViewStyle,
    HomeLeftOverSuggestionsMealsItemTextContainer: ViewStyle,
    HomeLeftOverSuggestionsMealsItemTitle: TextStyle,
    HomeLeftOverSuggestionsMealsItemDescription: TextStyle,
    HomeEmptyPantryMessage: ViewStyle,
    HomeEmptyPantryMessageLabel: TextStyle,
    HomeEmptyPantryMessageLabelBold: TextStyle,
    HomeEmptyPantryMessageIcon: ViewStyle,
    HomeEmptyPantryMessageButton: ViewStyle,
    HomeEmptyPantryMessageButtonLabel: TextStyle,

  },
  Planner: {
    PlannerComponent: ViewStyle,
    PlannerTitle: TextStyle,
    PlannerTitleRow: ViewStyle,
    PlannerRowTitleIcon: ViewStyle,
    PlannerWeeklyPlanLabel: TextStyle,
    PlannerWeeklyPlanLabelMargin: ViewStyle,
    PlannerDateLabel: TextStyle,
    PlannerDateLabelMargin: ViewStyle,
    PlannerDaysRow: ViewStyle,
    PlannerDaysRowElement: ViewStyle,
    PlannerDaysRowElementInactive: ViewStyle,
    PlannerDaysRowElementTitle: TextStyle,
    PlannerDaysRowElementDay: TextStyle,
    PlannerDaysRowElementDayActive: TextStyle,
    PlannerDaysRowElementDot: ViewStyle,
    PlannerMealRow: ViewStyle,
    PlannerMealRowElement: ViewStyle,
    PlannerMealRowElementLabelContainer: ViewStyle,
    PlannerMealRowElementLabel: TextStyle,
    PlannerMealRowElementLabelInactive: TextStyle,
    PlannerMealRowElementIcon: ViewStyle,
    PlannerTimeDayRow: ViewStyle,
    PlannerTimeDayRowLabel: TextStyle,
    PlannerTimeDayRowIcon: ViewStyle,
    PlannerRecipesColumn: ViewStyle,
    PlannerRecipesColumnElement: ViewStyle,
    PlannerRecipesColumnElementPicture: ViewStyle,
    PlannerRecipesColumnElementTitleLabel: TextStyle,
    PlannerRecipesColumnElementHeartIcon: ViewStyle,
    PlannerRecipesColumnElementDotsIcon: ViewStyle,
    PlannerRecipesColumnElementTimeIcon: ViewStyle,
    PlannerRecipesColumnElementPeopleIcon: ViewStyle,
    PlannerRecipesColumnElementDetailsRow: ViewStyle,
    PlannerRecipesColumnElementDetailsRowDivider: ViewStyle,
    PlannerRecipesColumnElementTimeLabel: TextStyle,
    PlannerRecipesColumnElementTitleRow: ViewStyle,
    PlannerRecipesColumnElementTimeRow: ViewStyle,
  },
  Pantry: {
    PantryComponent: ViewStyle,
    PantryTitleRow: ViewStyle,
    PantryTitle: TextStyle,
    PantryTitleICon: ViewStyle,
    PantrySearchInputContainer: ViewStyle,
    PantrySearchInputIcon: ViewStyle,
    PantrySearchInput: TextStyle,
    PantryCategoryLabelContainer: ViewStyle,
    PantryCategoryLabelContainerBottomBar: ViewStyle,
    PantryCategoryLabel: TextStyle,
    PantryCategoryLabelInactive: TextStyle,
    PantryCategoryRow: ViewStyle,
    PantrySectionLabelContainer: ViewStyle,
    PantrySectionIcon: ViewStyle,
    PantrySectionIconChevron: ViewStyle,
    PantrySectionLabel: TextStyle,
    PantrySectionItemContainer: ViewStyle,
    PantrySectionItemExpireContainer: ViewStyle,
    PantrySectionItemExpireLabel: TextStyle,
    PantrySectionItemExpireIcon: TextStyle,
    PantrySectionItemExpireMoreIcon: TextStyle,
    PantrySectionItemTitleRow: TextStyle,
    PantrySectionItemTitlePicture: TextStyle,
    PantrySectionItemTitleLabel: TextStyle,
    PantrySectionItemTitleKgLabelC: ViewStyle,
    PantrySectionItemTitleKgLabel: TextStyle,
    PantrySectionItemTitleProgressContainer: TextStyle,
    PantrySectionItemTitleProgressContainerLabel: TextStyle,
    PantrySectionItemTitleProgressContainerUsedLabel: TextStyle,
    PantryAbsoluteButton: ViewStyle,
    PantryAbsoluteButtonIcon: ViewStyle,
  },
  Recipes: {
    RecipesComponent: ViewStyle,
    RecipesTitleRow: ViewStyle,
    RecipesTitleIcon: ViewStyle,
    RecipesTitleLabel: TextStyle,
    RecipesCallToActionContainer: ViewStyle,
    RecipesCallToActionContainerShadow: ViewStyle,
    RecipesCallToActionTitleLabel: TextStyle,
    RecipesCallToActionSubLabel: TextStyle,
    RecipesCallToActionSubLabelIcon: ViewStyle,
    RecipesInventoryLabel: TextStyle,
    RecipesItemContainer: ViewStyle,
    RecipesItemContainerHeartIcon: ViewStyle,
    RecipesItemPicture: ViewStyle,
    RecipesItemTitleRow: ViewStyle,
    RecipesItemTitleLabel: TextStyle,
    RecipesItemDescriptionLabel: TextStyle,
    RecipesItemTimeRow: ViewStyle,
    RecipesItemTimeRowIcon: ViewStyle,
    RecipesItemTimeRowLabel: TextStyle,
    RecipesItemTimeRowPlusIcon: ViewStyle
  },
  Profile: {
    ProfileComponent: ViewStyle,
    ProfileTitleIcon: ViewStyle,
    ProfileTitleSubIcon: ViewStyle,
    ProfileHouseholdNameLabel: TextStyle,
    ProfileHouseholdIcon: ViewStyle,
    ProfileAddMembersLabel: TextStyle,
    ProfileAddMembersIcon: ViewStyle,
    ProfileHelpTipsContainer: ViewStyle,
    ProfileHelpTipsContainerTitleRow: ViewStyle,
    ProfileHelpTipsContainerTitleLabel: TextStyle,
    ProfileHelpTipsContainerTitleIcon: ViewStyle,
    ProfileHelpTipsElement: ViewStyle,
    ProfileHelpTipsElementIcon: ViewStyle,
    ProfileHelpTipsElementLogoutIcon: ViewStyle,
    ProfileHelpTipsElementLogoutLabel: TextStyle,
    ProfileHelpTipsElementChevronIcon: ViewStyle,
    ProfileHelpTipsElementLabel: TextStyle,
  },
  PlannerAdd: {
    PlannerComponent: ViewStyle,
    PlannerTitleRow: ViewStyle,
    PlannerTitleRowLabel: TextStyle,
    PlannerTitleRowIcon: ViewStyle,
    PlannerSearchContainer: ViewStyle,
    PlannerSearchInput: ViewStyle,
    PlannerSearchInputLabel: ViewStyle,
    PlannerSearchInputRow: ViewStyle,
    PlannerSelectLabel: TextStyle,
    PlannerSelectSubLabel: TextStyle,
    PlannerElementsContainer: ViewStyle,
    PlannerElementsContainerItem: ViewStyle,
    PlannerElementsContainerItemTitle: TextStyle,
    PlannerElementsContainerItemLabel: TextStyle,
    PlannerElementsContainerItemPicture: ViewStyle,
    PlannerElementsContainerItemTimeContainer: ViewStyle,
    PlannerElementsContainerItemTimeContainerIcon: ViewStyle,
    PlannerElementsContainerItemTimeContainerLabel: TextStyle,
    PlannerElementsContainerItemHeartIcon: ViewStyle,
    PlannerElementsContainerItemAddIcon: ViewStyle,
    PlannerCompleteActivityButton: ViewStyle,
    PlannerCompleteActivityButtonLabel: TextStyle,
  }
  RecipeDetail: {
    RecipeDetailComponent: ViewStyle,
    RecipeDetailTitleRow: TextStyle,
    RecipeDetailTitleRowLabel: TextStyle,
    RecipeDetailTitleRowBackIcon: ViewStyle,
    RecipeDetailTitleRowBackHeartIcon: ViewStyle,
    RecipeDetailTitleRowBackShareIcon: ViewStyle,
    RecipeDetailPictureScreen: ViewStyle,
    RecipeDetailDescription: TextStyle,
    RecipeDetailDescriptionRow: ViewStyle,
    RecipeDetailDescriptionRowIon20x20: ViewStyle,
    RecipeDetailDescriptionRowIon24x24: ViewStyle,
    RecipeDetailDescriptionRowLabel: TextStyle,
    RecipeDetailInputRowContainer: ViewStyle,
    RecipeDetailInputColContainer: ViewStyle,
    RecipeDetailInputRowContainerPlusIcon: ViewStyle,
    RecipeDetailInputRowContainerNumberField: ViewStyle,
    RecipeDetailInputRowContainerNumberFieldLabel: TextStyle,
    RecipeDetailInputRowContainerTextField: ViewStyle,
    RecipeDetailInputRowContainerTextFieldLabel: TextStyle,
    RecipeDetailInputRowContainerTextFieldIcon: ViewStyle,
    RecipeDetailNutritionColContainer: ViewStyle,
    RecipeDetailNutritionColContainerLabel: TextStyle,
    RecipeDetailNutritionRowContainer: ViewStyle,
    RecipeDetailNutritionLabelsColContainer: ViewStyle,
    RecipeDetailNutritionLabelsColContainerItem: ViewStyle,
    RecipeDetailNutritionLabelsColContainerItemBar: ViewStyle,
    RecipeDetailNutritionLabelsColContainerItemLabel: TextStyle,
    RecipeDetailNutritionLabelsColContainerItemSubLabel: TextStyle,
    RecipeDetailNutritionEllipseProgressContainer: ViewStyle,
    RecipeDetailNutritionEllipseProgressLabel: TextStyle,
    RecipeDetailIngredientsColContainer: ViewStyle,
    RecipeDetailIngredientsColContainerTitle: TextStyle,
    RecipeDetailIngredientsColContainerSubTitle: PrerenderedTextStyle,
    RecipeDetailIngredientsColContainerTitleRowContainer: ViewStyle,
    RecipeDetailIngredientsColContainerViewLess: TextStyle,
    RecipeDetailIngredientsColContainerViewLessIcon: ViewStyle,
    RecipeDetailIngredientsColContainerViewLessRow: ViewStyle,
    RecipeDetailIngredientsColContainerLabel: TextStyle,
    RecipeDetailIngredientsColContainerGrid4xH: ViewStyle,
    RecipeDetailIngredientsColContainerGridColItem: ViewStyle,
    RecipeDetailIngredientsColContainerGridColItemPicture: ViewStyle,
    RecipeDetailIngredientsColContainerGridColItemLabel: TextStyle,
    RecipeDetailIngredientsColContainerGridColItemSubLabel: TextStyle,
  },
  SearchScreen: SearchScreen,
  ScannerScreen: ScannerScreen,
  LoadingScreen: LoadingScreen,
  AddManuallyIngredientScreen: AddManuallyIngredientScreen
  // [key: string]: any; // Allow additional components to be added
};

export const defaultStyles: ComponentStyles = {
  Common: {
    VirSpace0: {
      height: 69.31,
    },
  },
  Splash: {
    SplashScreen: {
      backgroundColor: "#FF8D51"
    },
    SplashComponent: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    SplashLogoIcon: {
      // backgroundColor: 'red',
      width: 310,
      height: 196,
    },
  },
  Onboarding: {
    OnboardingComponent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: '#FDFEF4',
      paddingTop: 186,
      paddingHorizontal: 23,
    },
    OnboardingComponentSibling: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center',

      // backgroundColor:'blue',
    },
    OnboardingScreener: {
      width: 347,
      height: 326,
      // maxWidth: '50%',
      display: 'flex',
      maxWidth: '100%'
    },
    OnboardingTitle: {
      // Intelligent Meal Planner
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 27,
      // marginTop: -4,
      
      color: "#333333",
      textAlign: 'center'
    },
    OnboardingDescription: {
      // Plan your meals for the week ..
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 14 * 1.30,
      color: "#747474",
      textAlign: 'center',
      // 
      // marginTop: 12
    },
    OnboardingPhaseDisplay: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      height: 4,
      justifyContent: 'center',

    },
    OnboardingPhaseDisplayItem: {
      backgroundColor: '#EBEFF1',
      height: 4,
      width: 10,
      borderRadius: 10,
    },
    OnboardingMenu: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignContent: 'center',
      alignItems: 'center',
      height: 56,
      marginBottom: 67
    },
    OnboardingMenu1: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignContent: 'center',
      alignItems: 'center',
      height: 56,
      backgroundColor: '#FF8D51',
      marginBottom: 67,
      borderRadius: 16,
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow,
      position: 'relative',
      // elevation: 10, // Rough equivalent
    },
    OnboardingMenu1Label: {
      // Get started
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 21,
      color: "#ffffff"
    },
    OnboardingMenuSkip: {
      marginLeft: 33,
      // Skip
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 14 * 1.30,
      color: "#000000"
    },
    OnboardingMenuNext: {
      marginRight: 16,
      height: 56,
      width: 56,
      borderRadius: 29,
      backgroundColor: '#FF8D51',
      padding: 20,
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      shadowColor: 'rgb(121, 121, 121)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1, // Already included in rgba
      shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      elevation: 10, // Rough equivalent
    },
    OnboardingMenuNextIcon: {}
  },
  SignUp: {
    SignUpComplement: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 104,
      backgroundColor: "#FDFEF4",
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
      // alignContent:'center',
      // alignItems:'center'
    },
    SignUpTitle: {
      // Welcom to BhojanBuddy
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 36,
      // marginTop: -4,
      
      color: "#454D56",
      textAlign: 'center'
    },
    SignUpSubTitle: {
      // Welcome to BhojanBuddy
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 21,
      // marginTop: -4,
      letterSpacing: 0.25,
      color: "#9095A1",
      textAlign: 'center',

    },
    SignUpScreener: {
      marginLeft: 1,
      marginRight: 2,
      width: '100%',
      height: 227,
      marginBottom: 64,
      marginTop: 23,
    },
    SignUpSocialButton: {
      height: 56,
      borderRadius: 15,
      borderColor: '#333333',
      borderWidth: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      // paddingLeft: 26,
      marginBottom: 18,
      backgroundColor: "#FFFFFF",

    },
    SignUpSocialButtonLabel: {
      // Continue with Google
      fontSize: 14,
      lineHeight: 14 * 1.3,
      fontFamily: 'Poppins',
      fontWeight: 500,
      color: "#333333"
    },
    SignUpSocialButtonIcon: {
      // https://i.imgur.com/dtHkQsE.png guest
      // https://i.imgur.com/EQKtQgN.png apple
      // https://i.imgur.com/mmUnMk0.png facebook
      // https://i.imgur.com/YwKOc6n.png google
      height: 32,
      maxHeight: 32,
      width: 32,
      maxWidth: 32,
      transform: transform(25, 0)
    },
    SignUpAgreementLabel: {
      // By continuing, I agree to the Terms & Conditions and Privacy Policy
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: "#333333"
    },
    SignUpAgreementLabelMedium: {
      // By continuing, I agree to the Terms & Conditions and Privacy Policy
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      fontWeight: 500,
      color: "#333333"
    },

    SignUpComplementRowSibling: {
      display: 'flex',
      flexDirection: 'row'
    }
  },
  Preferences1: {
    Preferences1Complement: {
      paddingHorizontal: 16,
      paddingTop: 98,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      paddingBottom: 67,
      backgroundColor: "#FDFEF4"
    },
    Preferences1RowSibling: {
      display: 'flex',
      flexDirection: 'row',
      height: 21,
      alignContent: 'center',
      alignItems: 'center'
    },
    ProgressBar: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 38,
      height: 24
    },
    ProgressBarSibling: {
      width: 208,
      borderRadius: 20,
      height: 5,
      backgroundColor: "#F0F2F8",
      marginBottom: 2
    },
    ProgressBarSiblingChild: {
      minWidth: 52,
      width: 52,
      borderRadius: 20,
      height: 5,
      backgroundColor: "#F09C33"
    },
    ProgressBarLabelContainer: {
      marginTop: -8,
    },
    ProgressBarLabelLeft: {
      //01
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: "#333333",
      
      lineHeight: 16 * 1.3,
      fontSize: 16,
    },
    ProgressBarLabelRight: {
      //04
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: "#333333",
      
      lineHeight: 16 * 1.3,
      fontSize: 16,
    },
    ProgressBarLabelBackbutton: {
      width: 24,
      height: 24,
      // backgroundColor:'red'
    },
    PreferencesTitle: {
      // Choose Your Dietary Preference
      fontWeight: 600,
      fontSize: 24,
      fontFamily: 'Poppins',
      lineHeight: 24 * 1.3,
      
      color: "#333333"
    },
    PreferencesSubtitleContainer: {
      marginLeft: 0,
    },
    PreferencesSubtitle: {
      // Choose Your Dietary Preference
      fontWeight: 400,
      fontSize: 14,
      fontFamily: 'Poppins',
      lineHeight: 14 * 1.3,
      
      color: "#9095A1"
    },
    PreferencesButtonCommonContainer: {
      display: 'flex',
      gap: 13,
      flexDirection: 'row',
      marginBottom: 16,
      width: '100%',
      // backgroundColor:'red'
    },
    PreferencesButtonCommon: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: "#02733E",
      borderWidth: 1,
      borderRadius: 15,
      height: 50,
      flex: 1,
      maxWidth: '50%',
      backgroundColor: "#FFFFFF"
    },
    PreferencesButtonCommonSelected: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: "rgba(255, 141, 81,0.001)",
      borderWidth: 1,
      borderRadius: 15,
      height: 50,
      maxWidth: '50%',
      flex: 1,
      backgroundColor: "#FF8D51"
    },
    PreferencesButtonCommonSelectedLabel: {
      color: "#ffffff",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 14 * 1.3,
      
    },
    PreferencesButtonCommonLabelContainer: {
      marginLeft: 8,
    },
    PreferencesButtonCommonLabelContainerNoIcon: {
      marginLeft: 12,
    },
    PreferencesButtonCommonLabel: {
      color: "#333333",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 14 * 1.3,
      
    },
    PreferencesButtonCommonIcon: {
      height: 24,
      width: 24,
      marginLeft: 12,
      // 
    },
    PreferencesNextButton: {
      height: 56,
      backgroundColor: "#FF8D51",
      borderRadius: 15,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      position: 'relative'
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    PreferencesNextButtonPressable: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative'
    },

    PreferencesNextButtonLabel: {
      color: "#ffffff",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 14 * 1.3,
      
    },
    TimePickerFieldContainer: { marginBottom: 10 },
    TimePickerField: {
      height: 56,
      minHeight: 56,
      width: '100%',
      backgroundColor: '#F0F2F8',
      borderRadius: 14,
      marginTop: 6,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      // paddingTop: 17,
      paddingLeft: 10,
      paddingRight: 20,
    },
    TimePickerFieldIcon: {
      height: 24,
      width: 24,
      marginTop: -1,
    },
    TimePickerFieldLabel: {
      // hh:mm
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 21,
      
      color: "#9095A1",

    },
    TimePickerFieldTitle: {
      // Breakfast
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 18,
      
      color: "#333333",
    },
    TimePickerFieldTitleContainer: {
      marginLeft: 10
    }
  },
  AllSet: {
    AllSetComponentColSibling: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: "100%",
      width: '100%'
    },
    AllSetComponentColCommonSibling: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    AllSetComponent: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 22,
      paddingTop: 100,
      backgroundColor: "#FDFEF4",
      paddingBottom: 60,
    },
    AllSetScreener: {
      height: 342,
      width: 352,
      marginBottom: 45,
      maxWidth: '100%'
    },
    AllSetTitle: {
      // You are all set!
      fontSize: 24,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: "#333333",
      
    },
    AllSetIntroduction: {
      // Start planning your meals and managing your inventory now.
      color: "#747474",
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 400,
      
    },
    AllSetIntroductionMargin: {
      marginTop: 8
    },
    AllSetButtonsContainer: {
      height: 56,
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      gap: 13,
    },
    AllSetButtonCommon: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      // borderWidth: 1,
      // borderColor: "#02733E",
      // backgroundColor: '#fff',
      borderRadius: 15,
      overflow: 'visible',
      position: 'relative'
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent

    },
    AllSetButtonCall: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',

      borderRadius: 15,
      overflow: 'visible',
      position: 'relative'
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    AllSetButtonCallLabel: {
      // Go to home
      color: "#FFFFFF",
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 500,
      
    },
    AllSetButtonCommonLabel: {
      // Start planning
      color: "#333333",
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 500,
      
    },
    AllSetButtonCommonContainer: {
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }
  },
  Home: {
    HomeComponent: {
      paddingTop: 69,
      backgroundColor: '#FDFEF4',
      paddingHorizontal: 16,
      // opacity: 0.5
    },
    HomeHeadingRow: {
      height: 48,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      // paddingLeft: 16,
      // paddingRight: 16,
      marginBottom: 20,
      position: 'relative'
    },
    HomeHeadingTitle: {
      // Welcome, Atharva!
      fontFamily: "Poppins",
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 36,
      
      color: "#333333"
    },
    HomeHeadingDate: {
      // 21 Sept, Thursday
      fontFamily: "Poppins",
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 18,
      
      color: "#9095A1"
    },
    HomeHeadingIcon: {
      height: 14,
      width: 14,
      marginRight: 2,

    },
    HomeHeadingBellIcon: {
      height: 24,
      width: 24,

    },
    HomeUpcomingRow: {
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    HomeUpcomingLabel: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: "#333333",
      fontFamily: 'Poppins'
    },
    HomeUpcomingIcon: {
      height: 24,
      width: 24
    },
    HomeUpcomingMealColumn: {
      height: 144,
      // maxHeight: 144,
      width: '100%',
      paddingLeft: 12,
      paddingRight: 15,
      // paddingTop: 20,
      borderRadius: 19,
      overflow: 'visible',
      marginBottom: 28,
      backgroundColor: '#fff',
      position: 'relative',
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      // borderColor: '#333333',
      // borderWidth: 3
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 10 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 8, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 17, // Rough equivalent


    },
    HomeUpcomingMealHeadingRow: {
      height: 26,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3
    },
    HomeUpcomingMealHeadingRowTimeLabel: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
      color: "#9095A1",
      fontFamily: 'Poppins'
    },
    HomeUpcomingMealHeadingTimeIcon: {
      height: 12,
      width: 12,

      marginRight: 5,
    },
    HomeUpcomingMealHeadingHeartIcon: {
      height: 20,
      width: 20,
      // marginBottom: -10,
      marginRight: 4,
      transform: 'translateY(2px)'
    },
    HomeUpcomingMealHeadingDotsIcon: {
      height: 24,
      width: 24,

      marginLeft: 16
    },
    HomeUpcomingMealTitleRow: {
      height: 21,
      display: 'flex',
      gap: 4,
      flexDirection: 'row',
      marginBottom: 6,
      transform: 'translateY(0.5px)'
    },
    HomeUpcomingMealTitleLabel: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 21,
      color: "#333333",
      fontFamily: 'Poppins'
    },
    HomeUpcomingMealTitleIcon: {
      height: 16,
      width: 16,
      transform: 'translateY(1px)',
     
    },
    HomeUpcomingMealItemsRow: {
      height: 42,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff',
      gap: 25,
    },
    HomeUpcomingMealItemsMealP: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 5.5,
      height: 41,
      alignContent: 'flex-end',
      alignItems: 'flex-end',
    },
    HomeUpcomingMealItemsMeal: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 3.5,
      minHeight: 41,
      maxHeight: 41,
      alignContent: 'flex-end',
      alignItems: 'flex-end',
    },
    HomeUpcomingMealItemsMealPicture: {
      borderRadius: 6,
      minHeight: 34,
      maxHeight: 34,
      minWidth: 37,
      maxWidth: 37,
      // borderWidth: 2,
      // borderColor: 'black',
      // backgroundColor: 'red',
      overflow: 'visible',
      // marginTop: 9,
      marginRight: 0,
      position: 'relative',
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 


    },
    HomeUpcomingMealItemsMealTitle: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: "#000",
      
    },
    HomeUpcomingMealItemsMealCRow: {
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      transform: 'translateY(1px)'
      // marginLeft: 2
    },
    HomeUpcomingMealItemsMealCRowB: {
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 2,
      transform: 'translateY(1px)'
    },
    HomeUpcomingMealItemsMealTimeLabel: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 18,
      color: "#9095A1"
    },
    HomeUpcomingMealItemsMealIcon: {
      height: 12,
      width: 12,

      marginLeft: 4,
      marginRight: 2,
    },
    HomeUpcomingMealItemsMealIconB: {
      height: 14,
      width: 14,

      marginLeft: 4,
      marginRight: 2,
    },
    HomeUpcomingMealItemsMealIconC: {
      height: 14,
      width: 14,

      marginLeft: 5,
      marginRight: 2,
    },
    HomeUpcomingMealItemsMealServeLabel: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 18,
      color: "#9095A1"
    },
    HomeQuickInventoryLabel: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
      color: "#333333"
    },
    HomeQuickInventoryItemsContainer: {
      height: 159,

      display: 'flex',
      flexDirection: 'row',

      marginTop: 22,
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 24
    },
    HomeQuickInventoryItemsQuickSummary: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 22,
      gap: 14,
      backgroundColor: '#fff',
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 159,
      maxWidth: 113,

      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
      borderRadius: 19,
    },
    HomeQuickInventoryItemsQuickSummarySmall: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 12,
      gap: 19,
      backgroundColor: '#fff',
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 139,
      maxWidth: 99,
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
      borderRadius: 19,
    },
    HomeQuickInventoryItemsQuickSummaryTitle: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 21,
      color: "#9095A1"
    },
    HomeQuickInventoryItemsQuickSummaryTitleCenter: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 21,
      color: "#333333"
    },
    HomeQuickInventoryItemsQuickSummaryLabel: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 36,
      color: "#fff"
    },

    HomeQuickInventoryItemsQuickSummaryLabelRoundedContainer: {
      height: 62,
      width: 62,
      backgroundColor: "#02733E",
      borderRadius: 31,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    HomeQuickInventoryItemsQuickSummaryLabelRoundedContainerBig: {
      height: 72,
      width: 72,
      backgroundColor: "#02733E",
      borderRadius: 72,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    HomeLeftOverSuggestionsRow: {
      height: 24,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    HomeLeftOverSuggestionsLabel: {
      // Leftover suggestions
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Poppins',
      fontWeight: 600,
      
    },
    HomeLeftOverSuggestionsViewAllButton: {
      display: 'flex',
      flexDirection: 'row',

      alignContent: 'center',
      alignItems: 'center'
    },
    HomeLeftOverSuggestionsViewAllButtonLabel: {
      // Leftover suggestions
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 500,
      
      color: "#02733E"
    },
    HomeLeftOverSuggestionsViewAllButtonIcon: {
      height: 24,
      width: 24,
      marginLeft: -2
    },
    HomeLeftOverSuggestionsMealsRow: {
      height: 189,
      marginTop: 12,
      display: 'flex',
      gap: 17,
      flexDirection: 'row',
      overflow: 'visible',

    },
    HomeLeftOverSuggestionsMealsItemIconContainer: {
      position: 'absolute',
      // backgroundColor: 'white',
      right: 14,
      top: 15,
      width: 24,
      height: 24,
      // borderRadius: 35,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    HomeLeftOverSuggestionsMealsItemIcon: {
      height: 14,
      width: 14,

    },
    HomeLeftOverSuggestionsMealsItem: {
      width: 172,
      height: 189,
      borderRadius: 19,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'visible',
      // backgroundColor: "#fff",
      gap: 0,
      marginRight: 17,
      marginTop: 12,
      
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 17, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    HomeLeftOverSuggestionsMealsItemPicture: {
      height: 120,
      backgroundColor: 'orange',
      borderTopLeftRadius: 19,
      borderTopRightRadius: 19,
    },
    HomeLeftOverSuggestionsMealsItemTextContainer: {
      paddingLeft: 5,
      paddingTop: 4
    },
    HomeLeftOverSuggestionsMealsItemTitle: {
      // Vegetable Pulao
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 600,
      
      color: "#333333"
    },
    HomeLeftOverSuggestionsMealsItemDescription: {
      // Leftover suggestions
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      fontWeight: 400,
      
      color: "#9095A1"
    },
    HomeEmptyPantryMessage: {
      height: 159,
      minHeight: 159,
      width: '100%',
      paddingTop: 12,
      paddingBottom: 12,
      paddingHorizontal: 12.5,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      borderRadius: 19
    },
    HomeEmptyPantryMessageLabel: {
      // Is your pantry empty? maybe is time to
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'Poppins',
      fontWeight: 500,
      
      color: "#333333"
    },
    HomeEmptyPantryMessageLabelBold: {
      // make a list.
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'Poppins',
      fontWeight: 700,
      
      color: "#02733E"
    },
    HomeEmptyPantryMessageIcon: {
      height: 38,
      width: 36,
      marginBottom: 12,
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      borderRadius: 7,
      
    },
    HomeEmptyPantryMessageButton: {
      height: 48,
      width: '100%',
      marginTop: 11,
      backgroundColor: "#FF8D51",
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 15, 
      position: 'relative',
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
    },
    HomeEmptyPantryMessageButtonLabel: {
      // make a list.
      fontSize: 14,
      lineHeight: 14 * 1.3,
      fontFamily: 'Poppins',
      fontWeight: 500,
      
      color: "#FFFFFF"
    },
  },
  Planner: {
    PlannerComponent: {
      paddingTop: 69,
      backgroundColor: "#FDFEF4",
      paddingHorizontal: 16,
      paddingBottom: 300,
      height: '100%'
      // minHeight: 1200
    },
    PlannerTitle: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: "#333333",

    },
    PlannerRowTitleIcon: {
      height: 24,
      width: 24,
    },
    PlannerTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    },
    PlannerWeeklyPlanLabelMargin: {
      marginTop: 32,
    },
    PlannerDateLabelMargin: {
      marginTop: 14,
    },
    PlannerWeeklyPlanLabel: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: "#333333",
    },
    PlannerDateLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: "#9095A1",
    },
    PlannerDaysRow: {
      height: 79,
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'center',
      // gap: 31,
      position: 'relative',
      marginTop: -3,
      overflow: 'visible',
      // marginHorizontal: -16
      // backgroundColor: 'red'
    },
    PlannerDaysRowElement: {
      // minWidth: 24 + 31,
      minWidth: 24 ,
      // paddingHorizontal: 15.5,
      height: 79,
      // backgroundColor: 'red',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      // marginHorizontal: 15.5
    },
    PlannerDaysRowElementInactive: {
      // minWidth: 24 ,
      // maxWidth: 24 + 31,
      // paddingHorizontal: 15.5,
      height: 79,

      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    PlannerDaysRowElementTitle: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: 600,
      letterSpacing: 0.3,
      color: "#333333",
      fontFamily: 'Poppins'
    },
    PlannerDaysRowElementDay: {
      fontSize: 12,
      lineHeight: 26,
      fontWeight: 400,
      letterSpacing: 0.3,
      color: "#333333",
      fontFamily: 'Poppins'
    },
    PlannerDaysRowElementDayActive: {
      fontSize: 14,
      lineHeight: 26,
      fontWeight: 400,
      letterSpacing: 0.3,
      color: "#fff",
      fontFamily: 'Poppins'
    },
    PlannerDaysRowElementDot: {
      height: 6,
      width: 6,
      marginTop: 9,
      backgroundColor: '#E1DDD4',
      borderRadius: 3,
    },
    PlannerMealRow: {
      height: 48,
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
      marginHorizontal: -16,
      // maxWidth: 393,
      // minWidth: 393,
      // backgroundColor: 'red',
      position: 'relative'
    },
    PlannerMealRowElement: {
      flex: 1,
      display: 'flex',
      // backgroundColor: 'green',
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',

      // marginHorizontal: 16,

    },
    PlannerMealRowElementLabelContainer: {
      height: '100%',
      // borderBottomWidth: 2,
      // borderBottomColor: '#02733E',
      paddingLeft: 3,
      paddingRight: 2,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: 'blue'
    },
    PlannerMealRowElementLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 600,
      fontFamily: 'Poppins',
      color: "#02733E"
    },
    PlannerMealRowElementLabelInactive: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: "#9095A1"
    },
    PlannerMealRowElementIcon: {
      height: 16,
      width: 16,
      marginRight: 8
    },
    PlannerTimeDayRow: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 4,
      // backgroundColor: 'red',
      height: 21
    },
    PlannerTimeDayRowLabel: {
      fontFamily: 'Poppins',
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 400,
      
      color: "#333333",

    },
    PlannerTimeDayRowIcon: {
      height: 14,
      width: 14
    },
    PlannerRecipesColumn: {
      display: 'flex',
      gap: 21,
      marginTop: 20
    },
    PlannerRecipesColumnElement: {
      display: 'flex',
      flexDirection: 'row',
      height: 87,
      width: '100%',

      borderRadius: 19,
      overflow: 'hidden',
      backgroundColor: "#FFFFFF",
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 17, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    PlannerRecipesColumnElementPicture: {
      width: 117,
      height: '100%',

      position: 'relative',
    },
    PlannerRecipesColumnElementTitleLabel: {
      fontSize: 16,
      fontFamily: 'Poppins',
      lineHeight: 24,
      fontWeight: 500,
      
      color: "#333333",
    },
    PlannerRecipesColumnElementHeartIcon: {
      height: 20,
      width: 20,

    },
    PlannerRecipesColumnElementDotsIcon: {
      height: 24,
      width: 24,
    },
    PlannerRecipesColumnElementTimeIcon: {
      height: 12,
      width: 12,
      marginRight: 2
    },
    PlannerRecipesColumnElementDetailsRow: {
      display: 'flex',
      flexDirection: 'row',
      // marginBottom: 11,
      // backgroundColor: 'red',
      marginLeft: 18,
      alignContent: 'center',
      alignItems: 'center'
    },
    PlannerRecipesColumnElementDetailsRowDivider: {
      width: 6,
    },

    PlannerRecipesColumnElementPeopleIcon: {
      height: 14,
      width: 14,
      marginRight: 2
    },
    PlannerRecipesColumnElementTimeLabel: {
      fontSize: 12,
      fontFamily: 'Poppins',
      lineHeight: 18,
      fontWeight: 400,
      
      color: "#9095A1",
    },
    PlannerRecipesColumnElementTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginTop: 11,
      marginLeft: 18,
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingRight: 20
    },
    PlannerRecipesColumnElementTimeRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 24,
      paddingRight: 16,
      marginBottom: 11
    },
  },
  Pantry: {
    PantryComponent: {
      paddingTop: 69,
      paddingHorizontal: 16,
      backgroundColor: "#FDFEF4",
      minHeight: 1200
    },
    PantryTitleRow: {
      height: 36,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center', position: 'relative'
    },
    PantryTitle: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: 600,
      fontFamily: 'Poppins',
      color: "#333333"
    },
    PantryTitleICon: {
      height: 24,
      width: 24,
    },
    PantrySearchInputContainer: {
      position: 'relative',
      height: 46,
      borderRadius: 41,
      marginTop: 27,
      backgroundColor: "#FDFEF4",
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: 16,
      gap: 9,
      overflow: 'visible',
      
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    PantrySearchInputIcon: {
      height: 20,
      width: 20,
    },
    PantrySearchInput: {
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: "#9096AF"
    },
    PantryCategoryLabelContainer: {
      paddingHorizontal: 25.5,
      minHeight: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      // backgroundColor: 'red',
      alignContent: 'center',
      
      position: 'relative'
    },
    PantryCategoryLabelContainerBottomBar: {
      position: 'absolute',
      borderBottomColor: "#02733E",
      borderBottomWidth: 2, 
      bottom: 0,
      left: 12.5,
      right: 12.5
    },
    PantryCategoryLabel: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 21,
      color: "#02733E",
      fontFamily: 'Poppins'
    },
    PantryCategoryLabelInactive: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 21,
      color: "#9095A1",
      fontFamily: 'Poppins'
    },
    PantryCategoryRow: {
      display: 'flex',
      flexDirection: 'row',
      // gap: 25,
      marginTop: 16,
      height: 48,
      maxHeight: 48,
      position: 'relative',
      marginHorizontal: -16,
      paddingHorizontal: 16,
      
    },
    PantrySectionLabelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      // paddingVertical: 12,
      height: 48,
      minHeight: 48,
      // backgroundColor: 'red',
      // backgroundColor: 'red',
      borderBottomColor: '#F0F2F8',
      borderBottomWidth: 3,
      marginTop: 16,
      overflow: 'visible'
    },
    PantrySectionIcon: {
      height: 24,
      width: 24,

      marginRight: 6
    },
    PantrySectionIconChevron: {
      height: 24,
      width: 24,
      position:'absolute',
      top: 12,
      bottom: 12,
      right: 0,
    },
    PantrySectionLabel: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 24,
      fontFamily: "Poppins",
      color: "#333333"
    },
    PantrySectionItemContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 7,
      paddingLeft: 6,
      paddingBottom: 11.34,
      height: 96,
      maxHeight: 96,
      minHeight: 96,
      width: '100%',
      // maxWidth: 361,
      // minWidth: 361,
      position: 'relative',
      // backgroundColor: 'red'
    },
    PantrySectionItemExpireContainer: {
      height: 28,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'flex-end',
      alignItems: 'flex-end'
    },
    PantrySectionItemExpireLabel: {
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 15,
      letterSpacing: 0.5,
      fontFamily: "Poppins",
      color: "#9095A1"
    },
    PantrySectionItemExpireIcon: {
      width: 18,
      height: 18,
      marginRight: 3,
      marginLeft: 4,
    },
    PantrySectionItemExpireMoreIcon: {
      width: 24,
      height: 24,
      marginRight: 7,
      marginBottom: 2,

    },
    PantrySectionItemTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'flex-end',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    PantrySectionItemTitlePicture: {
      width: 40,
      height: 40,

      marginBottom: 2.66,
      marginRight: 3
    },
    PantrySectionItemTitleLabel: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 21,
      color: "#333333",
      fontFamily: "Poppins"
    },
    PantrySectionItemTitleKgLabelC: {
      marginLeft: 2,
    },
    PantrySectionItemTitleKgLabel: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 21,
      color: "#9095A1",
      fontFamily: "Poppins"
    },
    PantrySectionItemTitleProgressContainer: {
      height: 50,
      width: 50,
      borderRadius: 25,
      borderColor: '#D8D8D8',
      borderWidth: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red'
    },
    PantrySectionItemTitleProgressContainerLabel: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 12 * 1.5,
      color: "#333333",
      fontFamily: "Poppins",
      letterSpacing: 0.5
    },
    PantrySectionItemTitleProgressContainerUsedLabel: {
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 10 * 1.5,
      color: "#9095A1",
      fontFamily: "Poppins",
      letterSpacing: 0.5,
    },
    PantryAbsoluteButton: {
      backgroundColor: "#FF8D51",
      height: 56,
      width: 56,
      borderRadius: 56,
      position: 'absolute',
      right: 16,
      bottom: 94 + 49,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',

      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 23, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent
    },
    PantryAbsoluteButtonIcon: {
      width: 34.33,
      height: 34
    }
  },
  Recipes: {
    RecipesComponent: {
      paddingHorizontal: 16,
      paddingTop: 69,
    },
    RecipesTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      height: 36,
    },
    RecipesTitleIcon: {
      height: 24,
      width: 24
    },
    RecipesTitleLabel: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: 36,
      color: "#333333"
    },
    RecipesCallToActionContainer: {
      height: 161,
      borderRadius: 19,
      position: 'relative',
      overflow: 'hidden',
      // width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      gap: 26,
      paddingLeft: 10,
      paddingBottom: 12,
      marginTop: 18,
      marginBottom: 26,

    },
    RecipesCallToActionContainerShadow: {
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 8, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 4, // Rough equivalent
      backgroundColor: "#fff"
    },
    RecipesCallToActionTitleLabel: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 24,
      fontFamily: "Poppins",
      color: "#fff"
    },
    RecipesCallToActionSubLabel: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 21,
      fontFamily: "Poppins",
      color: "#fff"
    },
    RecipesCallToActionSubLabelIcon: {
      height: 16,
      width: 16
    },

    RecipesInventoryLabel: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 24,
      fontFamily: "Poppins",
      color: "#333333"
    },
    RecipesItemContainerHeartIcon: {
      width: 20,
      height: 20,
      marginRight: 4
    },
    RecipesItemContainer: {
      height: 87,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      marginBottom: 21,
      gap: 18,
      borderRadius: 19,
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 17, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent,
      overflow: 'visible',
      backgroundColor: "#fff",

    },
    RecipesItemPicture: {
      width: 117,
      height: 88,
      backgroundColor: 'brown',
      borderTopLeftRadius: 19,
      borderBottomLeftRadius: 19,
    },
    RecipesItemTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center'
    },
    RecipesItemTitleLabel: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Poppins',
      color: "#333333",
      fontWeight: '500',
      
    },
    RecipesItemDescriptionLabel: {
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      color: "#9095A1",
      fontWeight: 400,
      
    },
    RecipesItemTimeRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 5
    },
    RecipesItemTimeRowIcon: {
      height: 12,
      width: 12,
      marginRight: 4
    },
    RecipesItemTimeRowLabel: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: "#9095A1"
    },
    RecipesItemTimeRowPlusIcon: {
      minHeight: 24,
      minWidth: 24,

    }
  },
  Profile: {
    ProfileComponent: {
      paddingHorizontal: 16,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FDFEF4',
      paddingTop: 81,
      minHeight: '100%',
    },
    ProfileTitleIcon: {
      width: 86,
      height: 85.57,
      borderRadius: 50,
      // iOS shadow
      // shadowColor: 'rgba(0, 0, 0, 0.7)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 10, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 4, // Rough equivalent
    },
    ProfileTitleSubIcon: {
      width: 30,
      height: 30,
      borderRadius: 14.5,
      marginTop: 0,
      // marginBottom: 3.72,
      transform: transform(0.25, -13),
      // iOS shadow
      // shadowColor: 'rgba(0, 0, 0, 0.7)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 10, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 4, // Rough equivalent
    },
    ProfileHouseholdNameLabel: {
      fontSize: 24,
      lineHeight: 24 * 1.5,
      fontWeight: 500,
      fontFamily: 'Poppins',
      letterSpacing: 0.5,
      color: "#333333"
    },
    ProfileHouseholdIcon: {
      width: 18,
      height: 18
    },
    ProfileAddMembersLabel: {
      fontSize: 14,
      lineHeight: 14 * 1.5,
      fontWeight: 600,
      fontFamily: 'Poppins',
      letterSpacing: 0.5,
      color: "#02733E"
    },
    ProfileAddMembersIcon: {
      width: 14,
      height: 14
    },
    ProfileHelpTipsContainer: {
      marginBottom: 20,
      paddingBottom: 6.13,
      display: 'flex',
      paddingTop: 20.23,
      paddingHorizontal: 14,
      // backgroundColor:'red',
      width: '100%',
      backgroundColor: "#FFFFFF",
      borderRadius: 19,
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      // filter: 'drop-shadow(0px 2px 37px 9px rgba(34, 69, 37, 0.17))',
      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 17, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 10, // Rough equivalent,
      overflow: 'visible',
    },
    ProfileHelpTipsContainerTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6.2,
      height: 32.77,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 2,
      paddingBottom: 8.77,
      paddingLeft: 6
    },
    ProfileHelpTipsContainerTitleLabel: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 600,
      fontFamily: 'Poppins',
      
      color: "#333333"
    },
    ProfileHelpTipsContainerTitleIcon: {
      width: 20,
      height: 20
    },
    ProfileHelpTipsElement: {
      height: 53.87,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: 6,
      paddingRight: 2
      // width:'100'
    },
    ProfileHelpTipsElementIcon: {
      width: 24,
      height: 24
    },
    ProfileHelpTipsElementLogoutIcon: {
      width: 20,
      height: 20
    },
    ProfileHelpTipsElementLogoutLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 600,
      fontFamily: 'Poppins',
      
      color: "#02733E"
    },
    ProfileHelpTipsElementChevronIcon: {
      width: 20,
      height: 20
    },
    ProfileHelpTipsElementLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 400,
      fontFamily: 'Poppins',
      
      color: "#333333"
    },
  },
  PlannerAdd: {
    PlannerComponent: {
      backgroundColor: "#FDFEF4",
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 17,
      minHeight: 1200,
      paddingTop: 69,
      paddingBottom: 69,
    },
    PlannerTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: 13,
      height: 36,
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center'
    },
    PlannerTitleRowLabel: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: '#333333'
    },
    PlannerTitleRowIcon: {
      height: 24,
      width: 24,
    },
    PlannerSearchContainer: {

    },
    PlannerSearchInput: {},
    PlannerSearchInputLabel: {},
    PlannerSearchInputRow: {},
    PlannerSelectLabel: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: '#333333'
    },
    PlannerSelectSubLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#9095A1'
    },
    PlannerElementsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 21,
      marginTop: 18
    },
    PlannerElementsContainerItem: {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      width: '100%',
      height: 87,
      borderRadius: 19,
      backgroundColor: "#fff",

      // iOS shadow
      // shadowColor: 'rgb(121, 121, 121)',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1, // Already included in rgba
      // shadowRadius: 8, // Approximation: 37px blur in CSS ~ 23 in RN

      // Android shadow
      // elevation: 4, // Rough equivalent
      overflow: 'visible'
    },
    PlannerElementsContainerItemTitle: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'Poppins',
      fontWeight: 500,
      color: '#333333'
    },
    PlannerElementsContainerItemLabel: {
      fontSize: 10,
      lineHeight: 15,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#9095A1'
    },
    PlannerElementsContainerItemPicture: {
      width: 117,
      height: '100%',
      backgroundColor: 'grey',
      borderTopLeftRadius: 19,
      borderBottomLeftRadius: 19,
    },
    PlannerElementsContainerItemTimeContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      marginTop: 8,
      alignContent: 'center',
      alignItems: 'center'
    },
    PlannerElementsContainerItemTimeContainerIcon: {
      width: 12,
      height: 12,
      transform: transform(-0.5, -0.5)
    },
    PlannerElementsContainerItemTimeContainerLabel: {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#9095A1'
    },
    PlannerElementsContainerItemHeartIcon: {
      width: 20,
      height: 20,
      position: 'absolute',
      right: 20,
      top: 13,
      transform: transform(-1, -0.5)
    },
    PlannerElementsContainerItemAddIcon: {
      width: 24,
      height: 24,
      position: 'absolute',
      right: 16,
      bottom: 8,
      transform: transform(-1, -1.25)
    },
    PlannerCompleteActivityButton: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      height: 93,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FF8D51"
    },
    PlannerCompleteActivityButtonLabel: {
      fontFamily: "Poppins",
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 14 * 1.3,
      color: "#fff"
    }
  },
  RecipeDetail: {
    RecipeDetailComponent: {
      paddingTop: 69,
      paddingBottom: 300,
      backgroundColor: "#FDFEF4",
      paddingHorizontal: 16
    },
    RecipeDetailTitleRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      minHeight: 36,
      // maxHeight: 36,
      height: 'auto',
      // marginBottom: 13,
      position: 'relative',
      // backgroundColor: 'red'
      // marginBottom: 13,
    },
    RecipeDetailTitleRowLabel: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Poppins',
      fontWeight: 600,
      color: "#333333"
    },
    RecipeDetailTitleRowBackIcon: {
      height: 24,
      width: 24,
      marginRight: 5
    },
    RecipeDetailTitleRowBackHeartIcon: {
      height: 20,
      width: 20,
      marginRight: 11
    },
    RecipeDetailTitleRowBackShareIcon: {
      height: 20,
      width: 20,
    },
    RecipeDetailPictureScreen: {
      width: '100%',
      height: 333,
      borderRadius: 30,
      // backgroundColor: 'grey',
      marginBottom: 17,
      borderWidth: 0.05, 
      borderColor: "rgba(216,38,106, 0.1)", 
      backgroundColor: "#F89964",
    },
    RecipeDetailDescription: {
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'Poppins',
      lineHeight: 24,
      color: "#333333"
    },
    RecipeDetailDescriptionRow: {
      display: 'flex',
      flexDirection: 'row',

      // justifyContent: 'space-between',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      maxHeight: 21,
      height: 21

    },
    RecipeDetailDescriptionRowIon20x20: {
      height: 20,
      width: 20,
    },
    RecipeDetailDescriptionRowIon24x24: {
      height: 24,
      width: 24,
    },
    RecipeDetailDescriptionRowLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: "#9095A1"
    },
    RecipeDetailInputRowContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      
      // backgroundColor: 'rgba(0,0,244,0.5)'
    },
    RecipeDetailInputColContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    RecipeDetailInputRowContainerPlusIcon: {
      height: 24,
      width: 24,
    },
    RecipeDetailInputRowContainerNumberField: {
      minWidth: 30,
      height: 36
    },
    RecipeDetailInputRowContainerNumberFieldLabel: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: "#333333"
    },
    RecipeDetailInputRowContainerTextField: {
      // width: '100%',
      // maxWidth: '100%',
      flex: 1,
      height: 31,
    },
    RecipeDetailInputRowContainerTextFieldLabel: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: "#333333"
    },
    RecipeDetailInputRowContainerTextFieldIcon: {
      height: 24,
      width: 24,
      position: 'absolute',
      right: 0,
      bottom: 4,
    },
    RecipeDetailNutritionColContainer: {
      display: 'flex',
      flexDirection: 'column',
      borderTopColor: '#F0F2F8',
      borderTopWidth: 1,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomColor: "#F0F2F8",
      borderBottomWidth: 1,
      // backgroundColor: 'rgba(0,0,255,0.1)',
      maxHeight: 204,
      marginBottom: 5,
      position: 'relative'
    },
    RecipeDetailNutritionColContainerLabel: {
      fontSize: 16,
      fontFamily: "Poppins",
      color: "#333333",
      lineHeight: 24,
      fontWeight: 500
    },
    RecipeDetailNutritionRowContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    RecipeDetailNutritionLabelsColContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 29,
      paddingLeft: 54,
      gap: 6
    },
    RecipeDetailNutritionLabelsColContainerItem: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      alignContent: 'center',
      alignItems: 'center'
    },
    RecipeDetailNutritionLabelsColContainerItemBar: {
      height: 6,
      width: 34,
      backgroundColor: 'grey',
      borderRadius: 10,
      marginRight: 4
    },
    RecipeDetailNutritionLabelsColContainerItemLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#333333'
    },
    RecipeDetailNutritionLabelsColContainerItemSubLabel: {
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#9095A1'
    },
    RecipeDetailNutritionEllipseProgressContainer: {
      height: 120,
      width: 120,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginLeft: 12
    },
    RecipeDetailNutritionEllipseProgressLabel: {
      fontSize: 24,
      lineHeight: 33,
      color: "#333333",
      fontFamily: "Poppins",
      fontWeight: '500'
    },
    RecipeDetailIngredientsColContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      backgroundColor: "#fff",
      marginHorizontal: -12,
      paddingHorizontal: 12,
      // marginTop: 5
    },
    RecipeDetailIngredientsColContainerTitleRowContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxHeight: 24,
      // gap: 6,
    },
    RecipeDetailIngredientsColContainerTitle: {
      fontSize: 16,
      lineHeight: 24,
      color: "#333333",
      fontFamily: "Poppins",
      fontWeight: '500',
    },
    RecipeDetailIngredientsColContainerSubTitle: {
      width: 200,
      height: 21,
      lineHeight: 21,
      fontSize: 14,
      fontWeight: 400,
      color: "#9095A1",
      
      fontFamily: "Poppins",
    },
    RecipeDetailIngredientsColContainerViewLess: {
      fontSize: 14,
      lineHeight: 21,
      color: "#02733E",
      fontFamily: "Poppins",
      fontWeight: '500',
    },
    RecipeDetailIngredientsColContainerViewLessIcon: {
      height: 24,
      width: 24,
    },
    RecipeDetailIngredientsColContainerViewLessRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    },
    RecipeDetailIngredientsColContainerLabel: {
      fontFamily: "Poppins",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 500,
      color: "#333333"
    },
    RecipeDetailIngredientsColContainerGrid4xH: {
      display: "flex",
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      width: '100%',
      // backgroundColor: 'red'
    },
    RecipeDetailIngredientsColContainerGridColItem: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 13,
      // backgroundColor: 'blue',
      width: 'auto',
    },
    RecipeDetailIngredientsColContainerGridColItemPicture: {
      height: 59,
      width: 59,
      marginBottom: 2

      // backgroundColor: 'grey'
    },
    RecipeDetailIngredientsColContainerGridColItemLabel: {
      fontFamily: "Poppins",
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 500,
      color: "#333333"
    },
    RecipeDetailIngredientsColContainerGridColItemSubLabel: {
      fontFamily: "Poppins",
      fontSize: 10,
      lineHeight: 14,
      fontWeight: 400,
      color: "#9095A1"
    },
  },
  SearchScreen: SearchScreenStyle,
  ScannerScreen: ScannerScreenStyle,
  LoadingScreen: LoadingScreenStyle,
  AddManuallyIngredientScreen: AddManuallyIngredientScreenStyle
};

export { React, createContext, useContext, StyleSheet };

export type { ComponentStyles, TextStyle, ViewStyle, ImageStyle, ReactNode };
