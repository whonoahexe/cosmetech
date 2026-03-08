const imageFields = `{
	asset->{
		_id,
		url,
		metadata {
			lqip,
			dimensions {
				width,
				height,
				aspectRatio
			}
		}
	}
}`;

const seoFields = `{
	title,
	description,
	"image": image${imageFields}
}`;

const ctaLinkFields = `{
	label,
	href,
	openInNewTab
}`;

const socialLinkFields = `{
	platform,
	label,
	href
}`;

const contactMethodFields = `{
	label,
	value,
	kind,
	href
}`;

const sponsoredMetaFields = `{
	label,
	sponsorName,
	sponsorUrl
}`;

const topicFields = `{
	_id,
	title,
	"slug": slug.current,
	description
}`;

const tagFields = `{
	_id,
	title,
	"slug": slug.current,
	appliesTo
}`;

const categoryFields = `{
	_id,
	title,
	"slug": slug.current,
	description
}`;

export const contentCardProjection = `select(
	_type == "article" => {
		_id,
		_type,
		title,
		"slug": slug.current,
		excerpt,
		"image": coverImage${imageFields},
		publishDate,
		readTime,
		contentKind,
		popularityScore,
		isSponsored,
		sponsoredMeta${sponsoredMetaFields},
		"category": category->${categoryFields},
		"topics": topics[]->${topicFields},
		"tags": tags[]->${tagFields}
	},
	_type == "event" => {
		_id,
		_type,
		title,
		"slug": slug.current,
		"excerpt": summary,
		"image": image${imageFields},
		startDate,
		endDate,
		location,
		registrationUrl,
		isSponsored,
		sponsoredMeta${sponsoredMetaFields},
		"topics": topics[]->${topicFields},
		"tags": tags[]->${tagFields}
	},
	_type == "advertisement" => {
		_id,
		_type,
		title,
		"excerpt": summary,
		"image": image${imageFields},
		destinationUrl,
		ctaLabel,
		advertiser,
		activeFrom,
		activeTo,
		targetPages,
		renderVariant,
		sponsoredMeta${sponsoredMetaFields},
		"tags": tags[]->${tagFields},
		"targetCategories": targetCategories[]->${categoryFields},
		"targetTopics": targetTopics[]->${topicFields}
	}
)`;

const heroSlideFields = `{
	overrideTitle,
	overrideExcerpt,
	"overrideImage": overrideImage${imageFields},
	cta${ctaLinkFields},
	"tags": tags[]->${tagFields},
	"content": content->${contentCardProjection}
}`;

const feedSectionFields = `{
	title,
	mode,
	limit,
	contentTypes,
	"categories": categories[]->${categoryFields},
	"topics": topics[]->${topicFields},
	"manualItems": manualItems[]->${contentCardProjection}
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	_id,
	title,
	description,
	navigationLinks[]${ctaLinkFields},
	footerLinks[]${ctaLinkFields},
	socialLinks[]${socialLinkFields},
	defaultSeo${seoFields}
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
	_id,
	heroCarousel[]${heroSlideFields},
	latestSection${feedSectionFields},
	highlightedCategories[]->${categoryFields},
	upcomingEventsSection${feedSectionFields},
	subnavCategories[]->${categoryFields},
	seo${seoFields}
}`;

export const newsPageQuery = `*[_type == "newsPage"][0]{
	_id,
	title,
	intro,
	featuredStories${feedSectionFields},
	latestNews${feedSectionFields},
	pressReleaseSection${feedSectionFields},
	seo${seoFields}
}`;

export const eventsPageQuery = `*[_type == "eventsPage"][0]{
	_id,
	title,
	intro,
	filterTags[]->${tagFields},
	ongoingSection${feedSectionFields},
	pastSection${feedSectionFields},
	seo${seoFields}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
	_id,
	cosmetechTitle,
	cosmetechBody,
	quickLinks[]${ctaLinkFields},
	fourthWaveTitle,
	fourthWaveBody,
	fourthWaveLink${ctaLinkFields},
	socialLinks[]${socialLinkFields},
	seo${seoFields}
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
	_id,
	generalTitle,
	generalIntro,
	generalContactMethods[]${contactMethodFields},
	editorialTitle,
	editorialIntro,
	editorialContactMethods[]${contactMethodFields},
	advertisingTitle,
	advertisingBody,
	advertisingContactMethods[]${contactMethodFields},
	seo${seoFields}
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{
	_id,
	title,
	"slug": slug.current,
	description,
	"heroArticle": heroArticle->${contentCardProjection},
	allowedTopics[]->${topicFields},
	seo${seoFields}
}`;

export const topicsByCategoryIdQuery = `*[_type == "topic" && _id in *[_type == "article" && category._ref == $categoryId].topics[]._ref] | order(title asc) ${topicFields}`;

export const topicBySlugQuery = `*[_type == "topic" && slug.current == $slug][0]${topicFields}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
	_id,
	_type,
	title,
	"slug": slug.current,
	excerpt,
	"image": coverImage${imageFields},
	publishDate,
	readTime,
	contentKind,
	popularityScore,
	isSponsored,
	sponsoredMeta${sponsoredMetaFields},
	"category": category->${categoryFields},
	"topics": topics[]->${topicFields},
	"tags": tags[]->${tagFields},
	body,
	"relatedArticles": relatedArticles[]->${contentCardProjection},
	seo${seoFields}
}`;

export const eventsQuery = `*[_type == "event"] | order(startDate asc) ${contentCardProjection}`;
