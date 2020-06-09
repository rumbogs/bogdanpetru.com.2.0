const CleanCSS = require("clean-css");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
    
module.exports = function(eleventyConfig) {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' });

    /***************** FILTERS ******************/
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addFilter('serializePosts', (value) => {
        const postData = value.map((post) => {
            console.log("post", post)
            return {
            date: post.date,
            url: post.url,
            data: post.data,
            };
        });

        return JSON.stringify({
            collections: {
                post: postData,
            },
        }, null, 2);
    });

    eleventyConfig.addFilter('toDate', (date) => {     
        return dateTimeFormat.formatToParts(date).map(({ value }) => value).join('');
    });

    eleventyConfig.addDataExtension("default", contents => JSON.parse(contents));

    eleventyConfig.setTemplateFormats([
        "njk",
        "md"
    ]);

    /***************** PASSTHROUGH ******************/
    eleventyConfig.addPassthroughCopy("bundle.js");
    eleventyConfig.addPassthroughCopy("assets/fonts");
    eleventyConfig.addPassthroughCopy("assets/img");
    // eleventyConfig.addPassthroughCopy({
	//     "node_modules/fontfaceobserver/fontfaceobserver.js": "scripts/fontfaceobserver.js",
    // });

    /***************** PLUGINS ******************/
    eleventyConfig.addPlugin(syntaxHighlight, {
        templateFormats: ["md", "njk"],
        init: function({ Prism }) {
			Prism.languages.markdown = Prism.languages.extend('markup', {
				'frontmatter': {
					pattern: /^---[\s\S]*?^---$/m,
					greedy: true,
					inside: Prism.languages.yaml
				}
			});
		}
    });

    return {
        dir: {
            layouts: "_layouts"
        }
    };
};