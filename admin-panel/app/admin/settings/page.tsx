"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { X } from 'lucide-react';
import { countries, languages } from '@/lib/constance';

export default function SettingsPage() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [languageInput, setLanguageInput] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bro, setBro] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');

    const addLanguage = (lang: string) => {
        const validLanguage = languages.find((l) => l.label.toLowerCase() === lang.toLowerCase());
        if (validLanguage && !selectedLanguages.includes(validLanguage.label)) {
            setSelectedLanguages([...selectedLanguages, validLanguage.label]);
        }
    };

    const removeLanguage = (lang: string) => {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    };

    const filteredLanguages = languages.filter((l) =>
        l.label.toLowerCase().includes(languageInput.toLowerCase())
    );

    const validateProfile = () => {
        if (!name) return 'Name is required';
        if (!email || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) return 'Valid email is required';
        if (!selectedCountry) return 'Country is required';
        if (selectedLanguages.length === 0) return 'At least one language is required';
        return null;
    };

    const validateSecurity = () => {
        if (!currentPassword) return 'Current password is required';
        if (!newPassword) return 'New password is required';
        if (newPassword !== reenterPassword) return 'Passwords do not match';
        return null;
    };

    const handleProfileSubmit = () => {
        const error = validateProfile();
        if (error) {
            alert(error);
            return;
        }
        // Call API for profile update
        console.log('Profile submitted', { name, email, bro, selectedCountry, selectedLanguages });
    };

    const handleSecuritySubmit = () => {
        const error = validateSecurity();
        if (error) {
            alert(error);
            return;
        }
        // Call API for password update
        console.log('Security submitted', { currentPassword, newPassword });
    };

    return (
        <div className="p-4 grid gap-8 md:grid-cols-2">
            {/* Profile Section */}
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold my-4">Profile</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Bro</label>
                            <Textarea value={bro} onChange={(e) => setBro(e.target.value)} placeholder="Write something here..." />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Country</label>
                            <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                                <SelectTrigger className="w-full">{selectedCountry || 'Select a country'}</SelectTrigger>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Languages</label>
                            <div className="relative mb-2">
                                <Input
                                    type="text"
                                    value={languageInput}
                                    onChange={(e) => setLanguageInput(e.target.value)}
                                    placeholder="Search or add a language"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addLanguage(languageInput);
                                            setLanguageInput('');
                                        }
                                    }}
                                />
                                {languageInput && (
                                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg">
                                        {filteredLanguages.map((lang) => (
                                            <div
                                                key={lang.value}
                                                onClick={() => {
                                                    addLanguage(lang.label);
                                                    setLanguageInput('');
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                {lang.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedLanguages.map((lang) => (
                                    <div
                                        key={lang}
                                        className="flex items-center gap-1 bg-gray-200 text-sm px-2 py-1 rounded-lg">
                                        {lang}
                                        <X
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => removeLanguage(lang)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button className="mt-4" onClick={handleProfileSubmit}>Save Profile</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold my-4">Security</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Current Password</label>
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">New Password</label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Re-enter New Password</label>
                            <Input
                                type="password"
                                value={reenterPassword}
                                onChange={(e) => setReenterPassword(e.target.value)}
                                placeholder="Re-enter new password"
                            />
                        </div>

                        <Button className="mt-4" onClick={handleSecuritySubmit}>Update Password</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
