'use client'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { 
  Mail, 
  Send, 
  Settings, 
  Search, 
  Plus,
  Lock,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

export default function MailboxPage() {
  const [payToSendFee, setPayToSendFee] = useState('0.1');
  const [composeOpen, setComposeOpen] = useState(false);

  // Mock email data
  const emails = [
    {
      id: 1,
      from: '0x123...abc',
      subject: 'DAO Governance Proposal #42',
      preview: 'Vote on the new treasury allocation proposal...',
      timestamp: '2h ago',
      fee: '0.1 SUI',
      encrypted: true,
      read: false
    },
    {
      id: 2,
      from: '0x456...def',
      subject: 'Welcome to Web3 Conference',
      preview: 'Thank you for registering for the upcoming conference...',
      timestamp: '1d ago',
      fee: '0.05 SUI',
      encrypted: true,
      read: true
    },
    {
      id: 3,
      from: '0x789...ghi',
      subject: 'NFT Collection Update',
      preview: 'New drops available in our marketplace...',
      timestamp: '3d ago',
      fee: '0.2 SUI',
      encrypted: true,
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl mb-2">Mailbox</h1>
            <p className="text-gray-400">Your decentralized inbox on Sui blockchain</p>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => setComposeOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Fee Settings */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pay-to-Send Fee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fee">Current Fee (SUI)</Label>
                  <Input
                    id="fee"
                    value={payToSendFee}
                    onChange={(e:any) => setPayToSendFee(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0.1"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  This fee prevents spam and is required for others to send you messages.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Update Fee
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Inbox Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Messages</span>
                  <span>27</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Unread</span>
                  <span className="text-cyan-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fees Earned</span>
                  <span className="text-green-400">2.7 SUI</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="inbox" className="space-y-6">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="inbox" className="data-[state=active]:bg-gray-700">
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="sent" className="data-[state=active]:bg-gray-700">
                  Sent
                </TabsTrigger>
                <TabsTrigger value="compose" className="data-[state=active]:bg-gray-700">
                  Compose
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inbox" className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>

                {/* Email List */}
                <div className="space-y-3">
                  {emails.map((email) => (
                    <Card 
                      key={email.id} 
                      className={`bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 cursor-pointer transition-colors ${
                        !email.read ? 'border-cyan-500/50' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{email.from}</span>
                              </div>
                              {email.encrypted && (
                                <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/50">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Encrypted
                                </Badge>
                              )}
                              <Badge variant="outline" className="border-cyan-600/50 text-cyan-400">
                                {email.fee}
                              </Badge>
                            </div>
                            <h3 className={`${!email.read ? 'text-white font-semibold' : 'text-gray-300'}`}>
                              {email.subject}
                            </h3>
                            <p className="text-gray-400 text-sm">{email.preview}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{email.timestamp}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sent" className="space-y-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No sent messages</h3>
                    <p className="text-gray-400 mb-4">Start composing your first encrypted message</p>
                    <Button 
                      onClick={() => setComposeOpen(true)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none"
                    >
                      Compose Message
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compose" className="space-y-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Send className="w-5 h-5 mr-2" />
                      Compose New Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Recipient Wallet Address</Label>
                      <Input
                        id="recipient"
                        placeholder="0x..."
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter subject..."
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your encrypted message..."
                        className="bg-gray-700 border-gray-600 text-white min-h-32"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">Message will be encrypted</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Fee required: 0.1 SUI
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Save Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}