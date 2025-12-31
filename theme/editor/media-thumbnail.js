jQuery(document).ready(function ($) {
  let mediaFrame;

  $("#select-media-thumbnail").on("click", function (e) {
    e.preventDefault();

    // Open Media Library
    if (!mediaFrame) {
      mediaFrame = wp.media({
        title: "Select Media",
        button: { text: "Use this media" },
        multiple: false,
      });

      mediaFrame.on("select", function () {
        const attachment = mediaFrame.state().get("selection").first().toJSON();
        $("#media_thumbnail_id").val(attachment.id);
        $("#media-thumbnail-container").prepend(
          attachment.type === "image"
            ? `<div><img src="${attachment.url}" style="max-width:100%;"></div>`
            : `<div><video src="${attachment.url}" style="max-width:100%;" controls></video></div>`,
        );
        $("#remove-media-thumbnail").show();
      });
    }

    mediaFrame.open();
  });

  $("#remove-media-thumbnail").on("click", function () {
    $("#media_thumbnail_id").val("");
    $("#media-thumbnail-container img, #media-thumbnail-container video")
      .remove();
    $(this).hide();
  });
});
