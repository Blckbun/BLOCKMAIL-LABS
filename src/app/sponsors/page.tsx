'use client'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  Crown,
  Award,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function SponsorsPage() {
  const sponsorTiers = [
    {
      tier: 'Founding',
      price: '100 SUI',
      spots: 50,
      taken: 23,
      benefits: [
        '5% of all platform revenue forever',
        'Founding Sponsor NFT',
        'Governance voting rights',
        'Early access to new features',
        'Direct line to development team'
      ],
      color: 'from-purple-500 to-pink-600',
      icon: Crown
    },
    {
      tier: 'Pioneer',
      price: '50 SUI',
      spots: 100,
      taken: 67,
      benefits: [
        '2.5% of platform revenue share',
        'Pioneer Sponsor NFT',
        'Feature request priority',
        'Beta access to updates',
        'Community recognition'
      ],
      color: 'from-cyan-500 to-blue-600',
      icon: Star
    },
    {
      tier: 'Supporter',
      price: '25 SUI',
      spots: 200,
      taken: 134,
      benefits: [
        '1% of platform revenue share',
        'Supporter NFT badge',
        'Community access',
        'Monthly updates',
        'Name in credits'
      ],
      color: 'from-green-500 to-emerald-600',
      icon: Award
    }
  ];

  const roadmapItems = [
    {
      phase: 'Q1 2026',
      title: 'MVP Launch',
      description: 'Core messaging functionality with wallet integration',
      status: 'current'
    },
    {
      phase: 'Q2 2026',
      title: 'Advanced Features',
      description: 'Group messaging, file attachments, mobile app',
      status: 'upcoming'
    },
    {
      phase: 'Q3 2026',
      title: 'Enterprise Tools',
      description: 'Business accounts, API access, integrations',
      status: 'planned'
    },
    {
      phase: 'Q4 2026',
      title: 'Ecosystem Expansion',
      description: 'Cross-chain support, DeFi integrations',
      status: 'planned'
    }
  ];

  const stats = [
    { label: 'Total Raised', value: '2,847 SUI', icon: DollarSign },
    { label: 'Active Sponsors', value: '224', icon: Users },
    { label: 'Revenue Distributed', value: '156 SUI', icon: TrendingUp },
    { label: 'Platform Growth', value: '+285%', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text">
            Become a Founding Sponsor
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Support the future of decentralized communication and earn a permanent share of BlockMail's revenue. 
            Join our founding sponsors and help build the Web3 email revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-none">
              Become a Sponsor
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              View Whitepaper
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sponsor Tiers */}
        <div className="mb-12">
          <h2 className="text-3xl text-center mb-8 text-cyan-400">Sponsorship Tiers</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {sponsorTiers.map((tier, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-lg flex items-center justify-center`}>
                      <tier.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`bg-gradient-to-r ${tier.color} text-white border-none`}>
                      {tier.tier}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white">{tier.price}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Available spots</span>
                      <span className="text-white">{tier.spots - tier.taken} / {tier.spots}</span>
                    </div>
                    <Progress value={(tier.taken / tier.spots) * 100} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white border-none`}>
                    Become {tier.tier} Sponsor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl text-center mb-8 text-cyan-400">How Sponsorship Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl mb-4">Choose Your Tier</h3>
                <p className="text-gray-300">Select a sponsorship tier that matches your commitment level and desired benefits.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl mb-4">Stake & Receive NFT</h3>
                <p className="text-gray-300">Stake your SUI tokens and receive a unique sponsor NFT that represents your ownership stake.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl mb-4">Earn Forever</h3>
                <p className="text-gray-300">Receive your percentage of all platform revenue automatically distributed to your wallet.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-12">
          <h2 className="text-3xl text-center mb-8 text-cyan-400">Development Roadmap</h2>
          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <Card key={index} className={`bg-gray-800/50 border-gray-700 ${
                item.status === 'current' ? 'border-cyan-500/50 bg-cyan-900/10' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'current' ? 'bg-cyan-400' :
                        item.status === 'upcoming' ? 'bg-purple-400' :
                        'bg-gray-400'
                      }`} />
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === 'current' ? 'default' : 'outline'} 
                             className={item.status === 'current' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'border-gray-600 text-gray-400'}>
                        {item.phase}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-12">
          <h2 className="text-4xl mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us in building the decentralized communication infrastructure for Web3. 
            Your sponsorship helps create a spam-free, private email future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-none">
              Become a Founding Sponsor
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20">
              Join Our Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}