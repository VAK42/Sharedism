import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import * as bcrypt from 'bcryptjs'
async function main() {
  try {
    const adapter = new PrismaBetterSqlite3({ url: 'prisma/dev.db' } as any)
    const prisma = new PrismaClient({ adapter })
    await prisma.comment.deleteMany()
    await prisma.postTag.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    const password = await bcrypt.hash('password', 10)
    const users = await Promise.all([
      prisma.user.create({ data: { name: 'Alice Johnson', email: 'alice@example.com', password } }),
      prisma.user.create({ data: { name: 'Bob Smith', email: 'bob@example.com', password } }),
      prisma.user.create({ data: { name: 'Charlie Brown', email: 'charlie@example.com', password } }),
      prisma.user.create({ data: { name: 'David Lee', email: 'david@example.com', password } }),
      prisma.user.create({ data: { name: 'Eva Green', email: 'eva@example.com', password } }),
      prisma.user.create({ data: { name: 'Frank White', email: 'frank@example.com', password } }),
      prisma.user.create({ data: { name: 'Grace Miller', email: 'grace@example.com', password } }),
      prisma.user.create({ data: { name: 'Hannah King', email: 'hannah@example.com', password } }),
      prisma.user.create({ data: { name: 'Ian Scott', email: 'ian@example.com', password } }),
      prisma.user.create({ data: { name: 'Jack Turner', email: 'jack@example.com', password } })
    ])
    const tags = await Promise.all([
      prisma.tag.create({ data: { name: 'Technology' } }),
      prisma.tag.create({ data: { name: 'Lifestyle' } }),
      prisma.tag.create({ data: { name: 'Health & Fitness' } }),
      prisma.tag.create({ data: { name: 'Travel' } }),
      prisma.tag.create({ data: { name: 'Food' } }),
      prisma.tag.create({ data: { name: 'Finance' } }),
      prisma.tag.create({ data: { name: 'Education' } }),
      prisma.tag.create({ data: { name: 'Entertainment' } }),
      prisma.tag.create({ data: { name: 'Art & Culture' } }),
      prisma.tag.create({ data: { name: 'Science' } })
    ])
    const posts = await Promise.all([
      prisma.post.create({
        data: {
          title: 'The Future Of AI',
          content: 'Artificial Intelligence Is Evolving Rapidly! From Self-Driving Cars To AI In Healthcare!',
          status: 'Published',
          userId: users[0].id,
          postTags: { create: [{ tagId: tags[0].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Minimalist Living',
          content: 'Less Is More! Living With Intention!',
          status: 'Published',
          userId: users[1].id,
          postTags: { create: [{ tagId: tags[1].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Health & Wellness: A Balanced Life',
          content: 'How To Maintain A Healthy Lifestyle: Fitness, Nutrition & Mental Wellbeing!',
          status: 'Draft',
          userId: users[2].id,
          postTags: { create: [{ tagId: tags[2].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Exploring The World: Travel Tips & Adventures',
          content: 'Top 10 Destinations To Visit In 2025 & How To Travel Smart!',
          status: 'Published',
          userId: users[3].id,
          postTags: { create: [{ tagId: tags[3].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'The Art Of Cooking: Food As Expression',
          content: 'Creative Cooking Ideas: Simple Recipes & Delicious Meals For Every Occasion!',
          status: 'Draft',
          userId: users[4].id,
          postTags: { create: [{ tagId: tags[4].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Finance Tips For Beginners',
          content: 'How To Budget, Save & Invest Smartly!',
          status: 'Published',
          userId: users[5].id,
          postTags: { create: [{ tagId: tags[5].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'The Future Of Education: Online Learning',
          content: 'How Online Courses Are Revolutionizing Learning & Education!',
          status: 'Draft',
          userId: users[6].id,
          postTags: { create: [{ tagId: tags[6].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Entertainment In 2025: What To Expect',
          content: 'The Evolution Of Streaming Services & Interactive Media!',
          status: 'Published',
          userId: users[7].id,
          postTags: { create: [{ tagId: tags[7].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'Exploring Art & Culture Around The World',
          content: 'The Best Art Exhibitions & Cultural Events In 2025!',
          status: 'Draft',
          userId: users[8].id,
          postTags: { create: [{ tagId: tags[8].id }] }
        }
      }),
      prisma.post.create({
        data: {
          title: 'New Discoveries In Science & Innovation',
          content: 'Groundbreaking Research In Quantum Computing & Renewable Energy!',
          status: 'Published',
          userId: users[9].id,
          postTags: { create: [{ tagId: tags[9].id }] }
        }
      })
    ])
    const comments = await Promise.all([
      prisma.comment.create({
        data: { content: 'Amazing Insights On AI!', postId: posts[0].id, userId: users[1].id }
      }),
      prisma.comment.create({
        data: { content: 'I Love Minimalist Living! So Inspiring!', postId: posts[1].id, userId: users[0].id }
      }),
      prisma.comment.create({
        data: { content: 'Great Health Tips! Will Try Them!', postId: posts[2].id, userId: users[4].id }
      }),
      prisma.comment.create({
        data: { content: 'I Can’t Wait To Travel Again! Thanks For The Tips!', postId: posts[3].id, userId: users[2].id }
      }),
      prisma.comment.create({
        data: { content: 'I Am A Food Lover! Can’t Wait To Try Your Recipes!', postId: posts[4].id, userId: users[3].id }
      }),
      prisma.comment.create({
        data: { content: 'Great Finance Advice! Just What I Needed!', postId: posts[5].id, userId: users[6].id }
      }),
      prisma.comment.create({
        data: { content: 'I Love Online Learning! So Much Flexibility!', postId: posts[6].id, userId: users[7].id }
      }),
      prisma.comment.create({
        data: { content: 'Can’t Wait For The Next Big Movie Release!', postId: posts[7].id, userId: users[8].id }
      }),
      prisma.comment.create({
        data: { content: 'Art Exhibitions Are Always So Inspiring!', postId: posts[8].id, userId: users[9].id }
      }),
      prisma.comment.create({
        data: { content: 'Science Is Moving So Fast! Exciting Times Ahead!', postId: posts[9].id, userId: users[0].id }
      })
    ])
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
main()