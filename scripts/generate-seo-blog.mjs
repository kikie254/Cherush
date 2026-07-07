import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const topics = [
  { title: "Best Guest House in Iten", slug: "best-guest-house-in-iten", category: "Accommodation" },
  { title: "Where to Stay in Iten", slug: "where-to-stay-in-iten", category: "Accommodation" },
  { title: "Hotels Near Kamariny Stadium", slug: "hotels-near-kamariny-stadium", category: "Accommodation" },
  { title: "Altitude Training Accommodation", slug: "altitude-training-accommodation", category: "Training" },
  { title: "Running Camps in Iten", slug: "running-camps-in-iten", category: "Training" },
  { title: "Visiting Kerio Valley", slug: "visiting-kerio-valley", category: "Travel" },
  { title: "Family Holidays in Iten", slug: "family-holidays-in-iten", category: "Travel" },
  { title: "Weekend in Iten", slug: "weekend-in-iten", category: "Travel" },
  { title: "Budget Travel in Iten", slug: "budget-travel-in-iten", category: "Travel" },
  { title: "Best Time to Visit Iten", slug: "best-time-to-visit-iten", category: "Travel" },
  { title: "Iten Travel Guide", slug: "iten-travel-guide", category: "Guide" },
  { title: "Restaurants in Iten", slug: "restaurants-in-iten", category: "Guide" },
  { title: "Attractions Around Iten", slug: "attractions-around-iten", category: "Guide" }
]

function generateContent(title, slug) {
  const intro = "<p>Welcome to the definitive guide on <strong>" + title + "</strong>. When traveling to Iten, Kenya—the undisputed Home of Champions—navigating the local landscape requires specific knowledge. Sitting at an altitude of 2,400 meters along the breathtaking Kerio Valley escarpment, Iten is not just a destination for elite athletes; it is a serene haven for digital nomads, families, and adventure tourists.</p>"
  
  const section1 = "<h2 class=\"text-3xl mt-8 mb-4\">Why " + title + " Matters for Your Trip</h2><p>Finding the right information about " + title.toLowerCase() + " is crucial for maximizing your experience in Elgeyo Marakwet County. Many travelers arrive in Iten unprepared for the high altitude, the rural nature of the infrastructure, or the specific dietary and recovery requirements needed after a day exploring the Rift Valley.</p><p>Whether you are here to run on the famous red dirt trails alongside Olympic champions, or simply to relax and take in the panoramic views of the Chebloch Gorge, understanding " + title.toLowerCase() + " will significantly enhance your stay. Cherush Guesthouse serves as the perfect basecamp for these explorations, offering secure, premium accommodation tailored to both athletes and tourists.</p>"

  const section2 = "<h2 class=\"text-3xl mt-8 mb-4\">The Local Perspective</h2><p>To truly appreciate " + title.toLowerCase() + ", one must look at it through the lens of the local Kalenjin culture. The community here is built on hospitality, resilience, and a deep connection to the land. When engaging with " + title.toLowerCase() + ", always remember that you are in a community that values respect and quiet determination.</p><p>For instance, if you are searching for accommodation or travel tips regarding " + title.toLowerCase() + ", prioritizing places that offer 24/7 hot showers, high-speed fiber internet, and secure environments is non-negotiable. This is why Cherush Guesthouse is heavily recommended by locals and international visitors alike.</p>"

  const section3 = "<h2 class=\"text-3xl mt-8 mb-4\">Practical Tips and Strategies</h2><ul class=\"list-disc pl-6 space-y-4 my-6 text-lg\"><li><strong>Plan Ahead:</strong> Demand for services related to " + title.toLowerCase() + " surges during peak training seasons (January-March). Always book your stay at Cherush Guesthouse in advance.</li><li><strong>Connectivity:</strong> Ensure your accommodation has backup power and fiber WiFi. Remote work is highly popular in Iten, and staying connected while researching " + title.toLowerCase() + " is vital.</li><li><strong>Health & Nutrition:</strong> At 2,400m altitude, hydration is critical. Utilize the self-catering kitchens at Cherush to manage your exact dietary needs while exploring " + title.toLowerCase() + ".</li><li><strong>Local Transport:</strong> Use trusted local drivers or matatus to navigate the area. Ask the guesthouse staff for reliable contacts.</li></ul>"

  const section4 = "<h2 class=\"text-3xl mt-8 mb-4\">Frequently Asked Questions</h2><div class=\"space-y-6\"><div class=\"bg-primary/5 p-6 rounded-xl border border-primary/10\"><h4 class=\"font-bold text-xl text-primary mb-2\">How does " + title.toLowerCase() + " affect my itinerary?</h4><p>Integrating " + title.toLowerCase() + " into your plans requires flexibility. Always allow extra time for travel and rest, particularly during your first few days at altitude.</p></div><div class=\"bg-primary/5 p-6 rounded-xl border border-primary/10\"><h4 class=\"font-bold text-xl text-primary mb-2\">Is Iten safe for exploring this?</h4><p>Yes, Iten is one of the safest towns in Kenya. The local community is highly protective of visitors, making it a perfect environment for solo travelers and families.</p></div><div class=\"bg-primary/5 p-6 rounded-xl border border-primary/10\"><h4 class=\"font-bold text-xl text-primary mb-2\">Where is the best place to base myself?</h4><p>Cherush Guesthouse offers the ideal balance of proximity to the town center and peaceful seclusion, making it the perfect hub for everything related to " + title.toLowerCase() + ".</p></div></div>"

  const conclusion = "<h2 class=\"text-3xl mt-8 mb-4\">Conclusion</h2><p>In summary, mastering " + title.toLowerCase() + " is your gateway to an unforgettable experience in the Home of Champions. By preparing adequately, respecting the local culture, and choosing the right basecamp like Cherush Guesthouse, you guarantee a successful trip.</p><div class=\"bg-accent/10 border-l-4 border-accent p-8 rounded-r-xl mt-8\"><h3 class=\"text-2xl font-bold text-primary mb-4\">Ready to Experience Iten?</h3><p class=\"mb-6\">Don't leave your accommodation to chance. Book your stay at Cherush Guesthouse today and enjoy premium amenities, unbeatable security, and the best location in town.</p><a href=\"/bookings\" class=\"inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors\">Check Availability</a></div>"

  let longContent = intro + section1 + "<p>Furthermore, when we analyze the impact of this topic on the broader tourism ecosystem in Elgeyo Marakwet, it becomes evident that proper planning yields the best results. The Rift Valley offers unparalleled vistas, and engaging deeply with the local environment allows for a richer, more authentic travel experience.</p>" + section2 + "<p>It is also worth noting that the athletic culture influences almost every aspect of daily life here. From the food served in local eateries to the early morning schedules, adapting to this rhythm will make your engagement with this topic much more seamless.</p>" + section3 + "<p>Moreover, the integration of modern amenities in rural settings has revolutionized how visitors experience the region. Access to reliable internet and comfortable lodging means you can spend your days adventuring and your evenings recovering in total comfort.</p>" + section4 + conclusion;

  return longContent;
}

const generateBlogFile = () => {
  let fileContent = "export interface BlogPost {\n" +
    "  title: string;\n" +
    "  slug: string;\n" +
    "  date: string;\n" +
    "  datePublished: string;\n" +
    "  category: string;\n" +
    "  image: string;\n" +
    "  excerpt: string;\n" +
    "  content: string;\n" +
    "  faqs?: { question: string; answer: string }[];\n" +
    "}\n\n" +
    "export const blogPosts: BlogPost[] = [\n";

  topics.forEach((topic, index) => {
    const date = new Date(Date.now() - (index * 86400000 * 2))
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const isoDate = date.toISOString()
    const content = generateContent(topic.title, topic.slug)
    
    fileContent += "  {\n" +
      "    title: " + JSON.stringify(topic.title) + ",\n" +
      "    slug: " + JSON.stringify(topic.slug) + ",\n" +
      "    date: " + JSON.stringify(formattedDate) + ",\n" +
      "    datePublished: " + JSON.stringify(isoDate) + ",\n" +
      "    category: " + JSON.stringify(topic.category) + ",\n" +
      "    image: \"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1200\",\n" +
      "    excerpt: \"The definitive guide to " + topic.title + " in Iten, Kenya. Discover local insights, practical tips, and why Cherush Guesthouse is your ideal basecamp.\",\n" +
      "    content: " + JSON.stringify(content) + ",\n" +
      "    faqs: [\n" +
      "      { question: \"What is the most important thing to know about " + topic.title + "?\", answer: \"Preparation is key. Always ensure you have secure, comfortable accommodation like Cherush Guesthouse to serve as your basecamp.\" },\n" +
      "      { question: \"Is Iten suitable for tourists interested in " + topic.title + "?\", answer: \"Absolutely. Iten offers a unique blend of athletic excellence and natural beauty, making it perfect for this.\" },\n" +
      "      { question: \"How do I book accommodation near these activities?\", answer: \"You can book directly through the Cherush Guesthouse website for the best rates and guaranteed availability.\" }\n" +
      "    ]\n" +
      "  }" + (index === topics.length - 1 ? "" : ",") + "\n";
  })

  fileContent += "];\n";

  const targetPath = path.join(__dirname, '..', 'src', 'lib', 'blog-data.ts')
  fs.writeFileSync(targetPath, fileContent, 'utf8')
  console.log("Successfully generated " + topics.length + " massive SEO blog posts at " + targetPath)
}

generateBlogFile()
