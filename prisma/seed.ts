import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcryptjs from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Dummy data arrays
const dummyArtists = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@stagehype.com",
    password: "password123",
    bio: "Independent filmmaker and cinematographer with 10+ years experience",
    skills: ["Cinematography", "Directing", "Color Grading"],
  },
  {
    name: "Marcus Johnson",
    email: "marcus.johnson@stagehype.com",
    password: "password123",
    bio: "Award-winning director specializing in documentaries",
    skills: ["Directing", "Storytelling", "Documentary"],
  },
  {
    name: "Elena Rodriguez",
    email: "elena.rodriguez@stagehype.com",
    password: "password123",
    bio: "Visual effects artist and motion graphics designer",
    skills: ["VFX", "Motion Graphics", "Animation"],
  },
  {
    name: "David Kim",
    email: "david.kim@stagehype.com",
    password: "password123",
    bio: "Sound designer and composer for independent films",
    skills: ["Sound Design", "Composition", "Audio Engineering"],
  },
  {
    name: "Amelia Wright",
    email: "amelia.wright@stagehype.com",
    password: "password123",
    bio: "Screenwriter and producer",
    skills: ["Screenwriting", "Producing", "Story Development"],
  },
];

const dummyFilms = [
  {
    title: "Neon Dreams",
    description:
      "A cyberpunk thriller exploring identity in a digital world. Follow a hacker discovering a conspiracy that threatens to expose everyone's digital secrets.",
    genre: "Sci-Fi",
    mood: "Intense",
    year: 2025,
    duration: 128,
    language: "English",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
  },
  {
    title: "Mountain Echo",
    description:
      "A meditative documentary about mountain communities adapting to climate change. Beautiful cinematography showcasing nature and resilience.",
    genre: "Documentary",
    mood: "Contemplative",
    year: 2025,
    duration: 95,
    language: "English",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop",
  },
  {
    title: "Last Conversation",
    description:
      "An intimate drama about two estranged siblings reconnecting after years apart. A powerful exploration of family, forgiveness, and love.",
    genre: "Drama",
    mood: "Emotional",
    year: 2024,
    duration: 112,
    language: "English",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop",
  },
  {
    title: "Pixel Rebellion",
    description:
      "An experimental short film blending live action with animation. A commentary on technology addiction and digital escapism.",
    genre: "Experimental",
    mood: "Dark",
    year: 2025,
    duration: 38,
    language: "No Dialogue",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
  },
  {
    title: "Urban Voices",
    description:
      "A music documentary following street musicians in three major cities. Their stories of passion, struggle, and triumph through art.",
    genre: "Documentary",
    mood: "Inspiring",
    year: 2025,
    duration: 85,
    language: "Multiple",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=750&fit=crop",
  },
  {
    title: "The Waiting Room",
    description:
      "A psychological thriller set in a mysterious waiting room where time works differently. Nothing is what it seems.",
    genre: "Thriller",
    mood: "Suspenseful",
    year: 2024,
    duration: 98,
    language: "English",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
  },
  {
    title: "Silent Running",
    description:
      "An action short film shot entirely without dialogue. A thrilling chase sequence through abandoned industrial spaces.",
    genre: "Action",
    mood: "Intense",
    year: 2025,
    duration: 15,
    language: "No Dialogue",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1533460153894-86e44ebb0eef?w=500&h=750&fit=crop",
  },
  {
    title: "Fade to Black",
    description:
      "A noir-style detective story with a twist. Following a detective through a city of shadows and secrets.",
    genre: "Crime",
    mood: "Dark",
    year: 2025,
    duration: 105,
    language: "English",
    isApproved: true,
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminPassword = await bcryptjs.hash("admin123", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@stagehype.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Created admin user:", adminUser.email);

  // Create moderator user
  const modPassword = await bcryptjs.hash("moderator123", 10);
  const modUser = await prisma.user.create({
    data: {
      email: "moderator@stagehype.com",
      password: modPassword,
      role: "MODERATOR",
    },
  });
  console.log("✅ Created moderator user:", modUser.email);

  // Create artist users and profiles
  const createdArtists = [];
  for (const artist of dummyArtists) {
    const hashedPassword = await bcryptjs.hash(artist.password, 10);
    const user = await prisma.user.create({
      data: {
        email: artist.email,
        password: hashedPassword,
        role: "ARTIST",
      },
    });

    const profile = await prisma.artistProfile.create({
      data: {
        userId: user.id,
        displayName: artist.name,
        bio: artist.bio,
        skills: artist.skills.join(", "),
      },
    });

    createdArtists.push({ user, profile });
    console.log("✅ Created artist:", artist.name);
  }

  // Create films
  const createdFilms = [];
  for (let i = 0; i < dummyFilms.length; i++) {
    const film = await prisma.film.create({
      data: {
        title: dummyFilms[i].title,
        description: dummyFilms[i].description,
        genre: dummyFilms[i].genre,
        mood: dummyFilms[i].mood,
        year: dummyFilms[i].year,
        durationMin: dummyFilms[i].duration,
        language: dummyFilms[i].language,
        isApproved: dummyFilms[i].isApproved,
      },
    });
    createdFilms.push(film);
    console.log("✅ Created film:", film.title);
  }

  // Create film credits (assign artists to films in various roles)
  const roles = ["Director", "Cinematographer", "Producer", "Editor", "Sound Designer"];
  for (let i = 0; i < createdFilms.length; i++) {
    const film = createdFilms[i];
    // Assign 2-4 random artists to each film
    const creditCount = Math.floor(Math.random() * 3) + 2;
    for (let j = 0; j < creditCount; j++) {
      const randomArtist = createdArtists[Math.floor(Math.random() * createdArtists.length)];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];

      await prisma.filmCredit.create({
        data: {
          filmId: film.id,
          artistId: randomArtist.profile.id,
          role: randomRole,
        },
      });
    }
  }
  console.log("✅ Created film credits");

  // Create dummy donations
  const viewerPassword = await bcryptjs.hash("viewer123", 10);
  const viewer = await prisma.user.create({
    data: {
      email: "viewer@stagehype.com",
      password: viewerPassword,
      role: "VIEWER",
    },
  });
  console.log("✅ Created test viewer");

  // Create donations from viewer to various films
  const donationAmounts = [5, 10, 20, 50, 100];
  for (const film of createdFilms.slice(0, 5)) {
    const amount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)];
    await prisma.donation.create({
      data: {
        amount,
        platformFee: amount * 0.1,
        userId: viewer.id,
        filmId: film.id,
        artistId: createdArtists[0].profile.id,
      },
    });
  }
  console.log("✅ Created sample donations");

  console.log("\n🎬 Database seed completed successfully!");
  console.log("\n📋 Test Accounts:");
  console.log("   Admin: admin@stagehype.com / admin123");
  console.log("   Moderator: moderator@stagehype.com / moderator123");
  console.log("   Viewer: viewer@stagehype.com / viewer123");
  console.log("   Artists: See above with password 'password123'");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
