import { useState } from 'react';
import { Store, MapPin, CreditCard, Lock, Bell, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and store settings</p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList>
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Store Information */}
        <TabsContent value="store">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-[#4A90E2]" />
                  <div>
                    <CardTitle>Store Details</CardTitle>
                    <CardDescription>Update your store information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue="Adebayo's Artisan Crafts" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeType">Store Type</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>Handmade Crafts</option>
                      <option>Fashion & Accessories</option>
                      <option>Home Decor</option>
                      <option>Jewelry</option>
                      <option>Art & Collectibles</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea 
                    id="storeDescription" 
                    rows={4}
                    defaultValue="We create beautiful, handcrafted items using traditional Nigerian techniques. Each piece is unique and made with love."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+234 803 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="adebayo@vendoura.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#4A90E2]" />
                  <div>
                    <CardTitle>Business Address</CardTitle>
                    <CardDescription>Your store location and shipping address</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Lagos Street, Victoria Island" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Lagos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="Lagos State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" defaultValue="100001" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                Save Store Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#4A90E2] text-white text-2xl">AO</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">Change Photo</Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Adebayo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Oluwaseun" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input id="profileEmail" type="email" defaultValue="adebayo@vendoura.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePhone">Phone</Label>
                  <Input id="profilePhone" defaultValue="+234 803 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={3}
                  defaultValue="Passionate artisan specializing in traditional Nigerian crafts. 10+ years of experience."
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking */}
        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <CardTitle>Bank Account Details</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm">Primary Bank Account</p>
                  <span className="text-xs bg-[#56A45E] text-white px-2 py-1 rounded">Verified</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span>GTBank</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span style={{ fontFamily: 'Poppins' }}>0123456789</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span>Adebayo Oluwaseun</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Add New Bank Account</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newBank">Bank Name</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                      <option>Select bank</option>
                      <option>GTBank</option>
                      <option>Access Bank</option>
                      <option>First Bank</option>
                      <option>Zenith Bank</option>
                      <option>UBA</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newAccountNumber">Account Number</Label>
                    <Input id="newAccountNumber" placeholder="0123456789" />
                  </div>
                </div>
                <Button variant="outline">Add Bank Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#4A90E2]" />
                  <div>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground">Protect your account with two-factor authentication</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Order Updates</p>
                    <p className="text-xs text-muted-foreground">Get notified about new orders and status changes</p>
                  </div>
                  <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Marketing Emails</p>
                    <p className="text-xs text-muted-foreground">Receive tips, updates, and promotional content</p>
                  </div>
                  <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Low Stock Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified when products are running low</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1">Customer Messages</p>
                    <p className="text-xs text-muted-foreground">Notify when customers send you messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8]">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
