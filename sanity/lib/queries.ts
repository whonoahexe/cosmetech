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

const socialLinkFields = `{
	platform,
	label,
	href
}`;

const contactMethodFields = `{
	kind,
	value
}`;

const sponsoredMetaFields = `{
	label,
	sponsorName,
	sponsorUrl
}`;

const categoryFields = `{
	_id,
	title,
	"slug": slug.current,
	description
}`;

const agendaFields = `{
	time,
	label
}`;

const articleCardProjection = `{
	_id,
	_type,
	title,
	"slug": slug.current,
	excerpt,
	"image": coverImage${imageFields},
	publishDate,
	contentKinds,
	isSponsored,
	sponsoredMeta${sponsoredMetaFields},
	"categories": categories[]->${categoryFields},
	"categoryRefs": categories[]._ref,
	"plainText": pt::text(body)
}`;

const eventCardProjection = `{
	_id,
	_type,
	title,
	"slug": slug.current,
	"excerpt": summary,
	"image": image${imageFields},
	startDate,
	endDate,
	location,
	organizer,
	registrationUrl,
	eventTags,
	isSponsored,
	sponsoredMeta${sponsoredMetaFields}
}`;

const advertisementCardProjection = `{
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
	renderAs,
	sponsoredMeta${sponsoredMetaFields}
}`;

export const contentCardProjection = `{
	...select(
		_type == "article" => ${articleCardProjection},
		_type == "event" => ${eventCardProjection},
		_type == "advertisement" => ${advertisementCardProjection}
	)
}`;

const advertisementSlotFields = `{
	slot,
	"advertisement": advertisement->${advertisementCardProjection}
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	_id,
	title,
	description,
	socialLinks[]${socialLinkFields},
	defaultSeo${seoFields}
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
	_id,
	"carouselItems": carouselItems[]->${contentCardProjection},
	latestAdSlots[]${advertisementSlotFields},
	popularAdSlots[]${advertisementSlotFields},
	"sponsoredItems": sponsoredItems[]->${contentCardProjection},
	highlightedCategories[]->${categoryFields},
	"highlightedEvents": highlightedEvents[]->${eventCardProjection},
	seo${seoFields}
}`;

export const newsPageQuery = `*[_type == "newsPage"][0]{
	_id,
	pageDescription,
	"featuredBanner": featuredBanner->${contentCardProjection},
	"highlightedStories": highlightedStories[]->${contentCardProjection},
	seo${seoFields}
}`;

export const eventsPageQuery = `*[_type == "eventsPage"][0]{
	_id,
	pageDescription,
	seo${seoFields}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
	_id,
	cosmetechBody,
	fourthWaveBody,
	seo${seoFields}
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
	_id,
	generalContactEmail,
	editorialContactEmail,
	advertisingContacts[]${contactMethodFields},
	seo${seoFields}
}`;

export const faqPageQuery = `*[_type == "faqPage"][0]{
	_id,
	pageTitle,
	sections[]{
		title,
		items[]{
			question,
			answer
		}
	},
	seo${seoFields}
}`;

export const privacyPolicyPageQuery = `*[_type == "privacyPolicyPage"][0]{
	_id,
	pageTitle,
	body,
	seo${seoFields}
}`;

export const termsPageQuery = `*[_type == "termsPage"][0]{
	_id,
	pageTitle,
	body,
	seo${seoFields}
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
	_id,
	title,
	"slug": slug.current,
	description,
	"heroArticle": heroArticle->${articleCardProjection},
	"highlightedArticles": highlightedArticles[]->${articleCardProjection}
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{
	_id,
	title,
	"slug": slug.current,
	description,
	"heroArticle": heroArticle->${articleCardProjection},
	"highlightedArticles": highlightedArticles[]->${articleCardProjection}
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
	_id,
	_type,
	title,
	"slug": slug.current,
	excerpt,
	"image": coverImage${imageFields},
	publishDate,
	contentKinds,
	isSponsored,
	sponsoredMeta${sponsoredMetaFields},
	"categories": categories[]->${categoryFields},
	"plainText": pt::text(body),
	body,
	"relatedArticles": relatedArticles[]->${articleCardProjection},
	seo${seoFields}
}`;

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0]{
	_id,
	_type,
	title,
	"slug": slug.current,
	"excerpt": summary,
	"image": image${imageFields},
	startDate,
	endDate,
	location,
	organizer,
	registrationUrl,
	eventTags,
	isSponsored,
	sponsoredMeta${sponsoredMetaFields},
	body,
	agenda[]${agendaFields},
	"relatedEvents": relatedEvents[]->${eventCardProjection},
	seo${seoFields}
}`;

export const latestHomeContentQuery = `*[_type in ["article", "event"]] | order(coalesce(publishDate, startDate, _createdAt) desc)[0...5] ${contentCardProjection}`;

export const popularHomeContentQuery = `*[_type in ["article", "event"]] | order(coalesce(publishDate, startDate, _createdAt) desc)[0...5] ${contentCardProjection}`;

export const pressReleasesQuery = `*[_type == "article" && "pressRelease" in coalesce(contentKinds, [])] | order(coalesce(publishDate, _createdAt) desc)[0...4] ${articleCardProjection}`;

export const ongoingEventsQuery = `*[_type == "event" && dateTime(startDate) <= now() && (!defined(endDate) || dateTime(endDate) >= now())] | order(dateTime(startDate) asc) ${eventCardProjection}`;

export const pastEventsQuery = `*[_type == "event" && ((defined(endDate) && dateTime(endDate) < now()) || (!defined(endDate) && dateTime(startDate) < now()))] | order(coalesce(endDate, startDate) desc) ${eventCardProjection}`;

// Query articles by category ref ID (works even when category docs are drafts/unpublished)
export const articlesByCategoryRefQuery = `*[_type == "article" && $categoryId in categories[]._ref] | order(coalesce(publishDate, _createdAt) desc)[0...12] ${articleCardProjection}`;

// Query a few latest articles (for related articles fallback)
export const latestArticlesQuery = `*[_type == "article" && slug.current != $excludeSlug] | order(coalesce(publishDate, _createdAt) desc)[0...2] ${articleCardProjection}`;
