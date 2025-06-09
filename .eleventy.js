import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function(eleventyConfig) {
	// Set directories
    eleventyConfig.setInputDirectory("content");
    eleventyConfig.setIncludesDirectory("../_includes");
    eleventyConfig.setLayoutsDirectory("../_layouts");
    eleventyConfig.setDataDirectory("../_data");
    eleventyConfig.setOutputDirectory("_site");

    // Copy `css/` to `_site/`
	eleventyConfig.addPassthroughCopy("content/style.css");
	eleventyConfig.addPassthroughCopy("content/typewriter215fp-webfont.woff");
	eleventyConfig.addPassthroughCopy({"content/img/design/paper-background.jpg": "/img/paper-background.jpg"});
	eleventyConfig.addPassthroughCopy({"content/img/design/link-preview.jpg": "/img/link-preview.jpg"});
	eleventyConfig.addPassthroughCopy("js");

    // Passthrough during --serve
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["700", "1400", "auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
                sizes: "(min-width: 600px) 280px, 100vw"
			},
			pictureAttributes: {}
		},
	});
};

export const config = {
    htmlTemplateEngine: "njk"
}