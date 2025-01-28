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

    const [errors, setErrors] = useState<Record<string, string>>({});

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
        const newErrors: Record<string, string> = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) newErrors.email = 'Valid email is required';
        if (!selectedCountry) newErrors.country = 'Country is required';
        if (selectedLanguages.length === 0) newErrors.languages = 'At least one language is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSecurity = () => {
        const newErrors: Record<string, string> = {};
        if (!currentPassword) newErrors.currentPassword = 'Current password is required';
        if (!newPassword) newErrors.newPassword = 'New password is required';
        if (newPassword !== reenterPassword) newErrors.reenterPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileSubmit = () => {
        if (validateProfile()) {
            // Call API for profile update
            console.log('Profile submitted', { name, email, bro, selectedCountry, selectedLanguages });
        }
    };

    const handleSecuritySubmit = () => {
        if (validateSecurity()) {
            // Call API for password update
            console.log('Security submitted', { currentPassword, newPassword });
        }
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
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Bro</label>
                            <Textarea
                                value={bro}
                                onChange={(e) => setBro(e.target.value)}
                                placeholder="Write something here..."
                            />
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
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
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
                            {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
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
                            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">New Password</label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Re-enter New Password</label>
                            <Input
                                type="password"
                                value={reenterPassword}
                                onChange={(e) => setReenterPassword(e.target.value)}
                                placeholder="Re-enter new password"
                            />
                            {errors.reenterPassword && <p className="text-red-500 text-sm mt-1">{errors.reenterPassword}</p>}
                        </div>

                        <Button className="mt-4" onClick={handleSecuritySubmit}>Update Password</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

