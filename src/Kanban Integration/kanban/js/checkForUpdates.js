const disableCheck = false;
const currentVersion = "0.3";
const githubApiEndpoint = "https://api.github.com/repos/CyrilLeblanc/trilium-kanban/releases/latest";

module.exports = function($view) {
    if (disableCheck || window.kanban?.checked) {
       return;
    }

    $.ajax(githubApiEndpoint, {
        dataType: "JSON",
        success: data => {
            window.kanban = { checked: true }
            if (data.name > currentVersion) {
                const $banner = api.$container.find(".kanban-update-banner");
                const $a = $banner.find(".kanban-download");
                $a.attr("href", "https://github.com/CyrilLeblanc/trilium-kanban/releases/latest");
                $banner.show();
            }
        }
    });
}