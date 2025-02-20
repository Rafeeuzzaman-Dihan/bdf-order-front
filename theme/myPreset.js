import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
export  const myPreset = definePreset(Aura, {
  components: {
    navColor: {
        colorScheme: {
            light: {
                root: {
                    background: '{amber.500}',
                    color: '{amber.700}'
                },
                subtitle: {
                    color: '{amber.500}'
                }
            },
            dark: {
                root: {
                    background: '{amber.900}',
                    color: '{amber.600}'
                },
              }
            }
          }
        },
  semantic: {
    primary: {
      50: "{amber.50}",
      100: "{amber.100}",
      200: "{amber.200}",
      300: "{amber.300}",
      400: "{amber.400}",
      500: "{amber.500}",
      600: "{amber.600}",
      700: "{amber.700}",
      800: "{amber.800}",
      900: "{amber.900}",
      950: "{amber.950}",
    },
    focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{abmer.600}',
            offset: '1px'
        },
    colorScheme: {
      light: {
        primary: {
          color: "{amber.600}",
          inverseColor: "#ffffff",
          hoverColor: "{amber.500}",
          activeColor: "{amber.500}",
        },
        highlight: {
          background: "{amber.700}",
          focusBackground: "{amber.600}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
        formField: {
          hoverBorderColor: "{amber.600}",
        },
      },
      dark: {
        primary: {
          color: "{amber.600}",
          inverseColor: "{amber.950}",
          hoverColor: "{amber.500}",
          activeColor: "{amber.500}",
        },
        highlight: {
          background: "rgba(250, 190, 88, .16)",
          focusBackground: "rgba(250, 190, 88, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
    },
  },
});