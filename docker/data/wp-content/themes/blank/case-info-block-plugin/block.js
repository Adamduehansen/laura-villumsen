(function () {
  const { registerBlockType } = wp.blocks;
  const { createElement } = wp.element;

  registerBlockType("custom/wp-case-info", {
    title: "Case Info",
    category: "design",
    icon: "info-outline",
    attributes: {},

    // Editor display
    edit: () => {
      return createElement("div", {
        className: "wp-case-info",
        style: {
          border: "1px dashed #007cba",
          minHeight: "50px",
          padding: "10px",
        },
      });
    },

    // Frontend display
    save: () => {
      return createElement("div", { className: "wp-case-info" });
    },
  });
})();
