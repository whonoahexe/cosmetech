import { Separator } from "@/components/ui/separator";
import {
  ArticleBreadcrumb,
  ArticleContent,
  ArticleHeader,
  ArticleHero,
  ArticlePromo,
} from "@/components/pages/article";
import type { ArticleSection } from "@/components/pages/article/article-content";
import type { ArticleCardData } from "@/components/pages/home/article-card";

// ─── Placeholder data ────────────────────────────────────────────────────────

const ARTICLE_SECTIONS: ArticleSection[] = [
  {
    id: "p1",
    label: "Section 1",
    paragraphs: [
      "People don't search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational.",
    ],
  },
  {
    id: "p2",
    label: "Section 2",
    paragraphs: [
      "I keep opening analytics dashboards like they're going to confess something. Organic search still sends traffic, sure. But the vibe shifted. Queries look less like caveman keyword stacks and more like late-night DMs. Full sentences. Context. Opinions baked in. Users treating the internet like a colleague who owes them a thoughtful reply. The search bar used to be a vending machine. Now it's a chat window with trust issues.",
    ],
  },
  {
    id: "p3",
    label: "Section 3",
    paragraphs: [
      "This isn't just a UX tweak. It's a cognitive rewrite. For twenty years we trained ourselves to think like robots so robots could find stuff for us. Strip verbs. Drop articles. Jam nouns together. best laptop 2024 budget student. We all became weirdly fluent in keyword pidgin. Then chat-first interfaces showed up and people snapped back into human language overnight. Turns out nobody wanted to think like a parser. We just tolerated it.",
    ],
  },
  {
    id: "p4",
    label: "Section 4",
    paragraphs: [
      "Asking is different from searching. Searching assumes the answer exists somewhere static and indexed. Asking assumes the answer might need synthesis. Interpretation. Maybe even judgment. When someone asks an AI or a community thread, they're not just retrieving data. They're outsourcing thinking. That's a huge shift in how authority gets constructed online. The top result used to win. Now the most convincing response wins. And convincing is messy. It's tone, clarity, relevance, timing, social proof. Sometimes it's just whoever replied first with decent formatting and a strong opinion.",
    ],
  },
  {
    id: "p5",
    label: "Section 5",
    paragraphs: [
      "Forums are weirdly back from the dead because of this. Reddit, Discord servers, private Slack groups, niche communities. People want answers from entities that feel situated. A search result feels anonymous. A reply feels accountable, even when it isn't. You ask a question in a group chat and someone who has been burned by the exact same problem gives you a story plus a solution. That hits differently than a 2,000-word SEO article that opens with a definition you didn't need.",
    ],
  },
  {
    id: "p6",
    label: "Section 6",
    paragraphs: [
      "Forums are weirdly back from the dead because of this. Reddit, Discord servers, private Slack groups, niche communities. People want answers from entities that feel situated. A search result feels anonymous. A reply feels accountable, even when it isn't. You ask a question in a group chat and someone who has been burned by the exact same problem gives you a story plus a solution. That hits differently than a 2,000-word SEO article that opens with a definition you didn't need.",
    ],
  },
  {
    id: "p7",
    label: "Section 7",
    paragraphs: [
      "AI slots right into this behavioral groove. It feels like a supercharged forum where the replies are instant and the thread never derails into keyboard warfare. You ask for recommendations, clarifications, step-by-step help. You refine. You push back. You iterate. It's a conversation, not a query. The mental model shifts from find the page to work through the problem. That's sticky. Once people get used to that loop, going back to ten blue links feels like using a map after GPS spoiled you.",
    ],
  },
  {
    id: "p8",
    label: "Section 8",
    paragraphs: [
      "From an editorial and publishing standpoint, this is both terrifying and kind of exciting. The old playbook was simple. Pick keywords. Structure content to rank. Win the snippet. Capture traffic. Monetize attention. Now traffic leaks into chat interfaces where attribution is fuzzy and brand visibility gets abstracted. Your article might inform an AI answer without anyone ever seeing your logo. Brutal. Also kind of inevitable.",
    ],
  },
];

const PROMO_ARTICLE: ArticleCardData = {
  title: "Minimalism Was a Phase. We Want Texture Again",
  excerpt:
    "Clean design ruled for a decade. Now people want personality, clutter, and interfaces that feel human.",
  category: "Regulations",
  isSponsored: true,
  readTime: 6,
  image: null,
};

export default function ArticlePage() {
  const ARTICLE_TITLE = "Search Is Dead. Long Live Asking.";
  const ARTICLE_EXCERPT =
    "People do not search anymore. They ask. AI, forums, group chats. Information retrieval just turned conversational.";
  const ARTICLE_CATEGORY = "Fragrance";
  const ARTICLE_READ_TIME = 6;

  return (
    <div className="flex flex-col mt-4 gap-4 mb-32">
      <ArticleHero />
      <ArticleHeader
        title={ARTICLE_TITLE}
        excerpt={ARTICLE_EXCERPT}
        category={ARTICLE_CATEGORY}
        readTime={ARTICLE_READ_TIME}
      />

      <section className="relative py-16 lg:px-32 xl:px-64">
        <div className="mx-auto w-full max-w-6xl">
          <ArticleBreadcrumb category={ARTICLE_CATEGORY} />

          <div className="lg:pr-20 pt-16">
            <ArticleContent sections={ARTICLE_SECTIONS} />

            <Separator className="my-16" />

            <ArticlePromo promoArticle={PROMO_ARTICLE} />
          </div>
        </div>
      </section>
    </div>
  );
}
