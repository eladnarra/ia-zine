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
			},
			pictureAttributes: {}
		},
	});
};

export const config = {
    htmlTemplateEngine: "njk"
}