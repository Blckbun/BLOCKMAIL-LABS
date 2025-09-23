'use client'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Switch } from '../../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { 
  User, 
  Wallet, 
  Shield, 
  Settings, 
  Bell,
  Key,
  DollarSign,
  Activity,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useCurrentAccount } from '@mysten/dapp-kit'

export default function ProfilePage() {
  const currentAccount = useCurrentAccount()
  const [displayName, setDisplayName] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentAccount?.address || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  };

  const stats = [
    { label: 'Messages Sent', value: '47', icon: Activity },
    { label: 'Messages Received', value: '123', icon: Activity },
    { label: 'Fees Earned', value: '12.3 SUI', icon: DollarSign },
    { label: 'Days Active', value: '28', icon: Activity }
  ];

  const recentActivity = [
    {
      type: 'sent',
      action: 'Sent message to 0x456...def',
      timestamp: '2 hours ago',
      fee: '0.1 SUI'
    },
    {
      type: 'received',
      action: 'Received message from 0x789...ghi',
      timestamp: '1 day ago',
      fee: '0.05 SUI'
    },
    {
      type: 'fee_update',
      action: 'Updated pay-to-send fee',
      timestamp: '3 days ago',
      fee: '0.1 SUI'
    },
    {
      type: 'received',
      action: 'Received message from 0x123...abc',
      timestamp: '5 days ago',
      fee: '0.2 SUI'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Profile</h1>
          <p className="text-gray-400">Manage your BlockMail identity and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <User className="w-5 h-5 mr-2" />
                  Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">{displayName || 'Anonymous User'}</h3>
                  <div className="flex items-center justify-center space-x-2 bg-gray-700/50 p-2 rounded-lg">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300 font-mono">
                      {`${currentAccount?.address.slice(0, 9)}...${currentAccount?.address.slice(-9)}`}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyAddress}
                      className="p-1 h-auto hover:bg-gray-600"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/50">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Wallet
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{stat.label}</span>
                    </div>
                    <span className="text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="settings" className="space-y-6">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
                  Security
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Settings className="w-5 h-5 mr-2" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="displayName">Display Name (Optional)</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                        placeholder="Enter display name..."
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        This name will be visible to others when sending messages
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive notifications for new messages</p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Public Profile</Label>
                        <p className="text-sm text-gray-400">Allow others to discover your profile</p>
                      </div>
                      <Switch
                        checked={publicProfile}
                        onCheckedChange={setPublicProfile}
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Fee Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="baseFee">Base Pay-to-Send Fee (SUI)</Label>
                      <Input
                        id="baseFee"
                        defaultValue="0.1"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="premiumFee">Premium Fee for Unknown Senders (SUI)</Label>
                      <Input
                        id="premiumFee"
                        defaultValue="0.5"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Fees help prevent spam and generate revenue from your inbox
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-none">
                      Update Fees
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Wallet Connected</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Your Sui wallet is securely connected and all messages are encrypted end-to-end.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-cyan-400" />
                          <div>
                            <p className="font-semibold">Encryption Keys</p>
                            <p className="text-sm text-gray-400">Managed by your wallet</p>
                          </div>
                        </div>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/50">
                          Active
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-cyan-400" />
                          <div>
                            <p className="font-semibold">Security Notifications</p>
                            <p className="text-sm text-gray-400">Alerts for unusual activity</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
                      <p className="text-amber-400 font-semibold mb-1">Important Security Note</p>
                      <p className="text-sm text-gray-300">
                        Your private keys are stored securely in your wallet. BlockMail never has access to your private keys or unencrypted messages.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Activity className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'sent' ? 'bg-blue-400' :
                              activity.type === 'received' ? 'bg-green-400' :
                              'bg-purple-400'
                            }`} />
                            <div>
                              <p className="text-white">{activity.action}</p>
                              <p className="text-sm text-gray-400">{activity.timestamp}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {activity.fee}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}