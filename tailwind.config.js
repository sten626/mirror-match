module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: "var(--md-sys-color-primary)",
      surface: "var(--md-sys-color-surface)",
      "on-surface": "var(--md-sys-color-on-surface)"
    },
    fontFamily: {
      "title-large": "var(--md-sys-typescale-title-large-family)"
    },
    fontSize: {
      "title-large": "var(--md-sys-typescale-title-large-size)"
    },
    fontWeight: {
      "title-large": "var(--md-sys-typescale-title-large-weight)"
    },
    lineHeight: {
      "title-large": "28px"
    },
    extend: {},
  },
  plugins: [],
}
