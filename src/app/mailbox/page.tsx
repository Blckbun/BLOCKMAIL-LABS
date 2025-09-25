'use client'
import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { 
  Mail, 
  Settings, 
  Plus,
  DollarSign,
} from 'lucide-react'
import ComposeNewMail from '@/components/composeNewMail'
import Inbox from '@/components/inbox'

export default function MailboxPage() {
  const [payToSendFee, setPayToSendFee] = useState('0.1');
  const [composeOpen, setComposeOpen] = useState(false);

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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayToSendFee(e.target.value)}
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
                <Inbox />
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
                <ComposeNewMail />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}