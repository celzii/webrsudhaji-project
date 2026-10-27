import { Link } from '@inertiajs/react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer>
            {/* Main Footer */}
            <div className="bg-[#BAEBD4] px-6 lg:px-20 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Kolom 1 - Logo & Alamat */}
                    <div>
                        <Link href="/" className="flex items-center mb-3">
                            <img
                                src="/images/LogoHAJI.webp"
                                alt="Logo RSUD Haji"
                                className="h-12 w-auto max-w-full"
                            />
                        </Link>
                        <p className="text-slate-700 text-xs leading-relaxed">
                            Jl. Dg. Ngeppe, Balang Baru, Kec. Tamalate, Kota Makassar, Sulawesi Selatan 90122
                        </p>
                    </div>

                    {/* Kolom 2 - Tentang Kami */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Tentang kami</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { icon: '🗓️', label: 'Visi dan Misi', href: '/profil' },
                                { icon: '📋', label: 'Layanan Unggulan', href: '/layanan/unggulan' },
                                { icon: '🩺', label: 'Dokter Kami', href: '/daftar-dokter' },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="flex items-center gap-2 border border-slate-400 rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-white transition"
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Kolom 3 - Layanan Kami */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Layanan kami</h4>
                        <ul className="flex flex-col gap-2 text-sm text-slate-700">
                            {[
                                { label: 'Layanan Unggulan', href: '/layanan/unggulan' },
                                { label: 'Layanan Rawat Inap', href: '/layanan/rawat-inap' },
                                { label: 'Layanan Rawat Jalan', href: '/layanan/rawat-jalan' },
                                { label: 'Layanan Rawat Intensif', href: '/layanan/rawat-intensif' },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="hover:text-green-700 transition">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 4 - Ikuti Kami */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Ikuti kami</h4>
                        <div className="flex gap-4 mb-6 text-3xl text-slate-800">
                            <a href="https://www.facebook.com/people/RSUD-Haji-Makassar-Pemprov-Sulsel/61559860927158/" className="hover:text-blue-600 transition"><FaFacebook /></a>
                            <a href="https://x.com/Uptrsudhajimks?t=mIPpEiV31C1Gbq0Pg3VWhQ" className="hover:text-sky-500 transition"><FaTwitter /></a>
                            <a href="https://www.instagram.com/rsudhaji_sulsel" className="hover:text-pink-500 transition"><FaInstagram /></a>
                            <a href="https://www.youtube.com/@upt_rsudhaji_makassar" className="hover:text-red-600 transition"><FaYoutube /></a>
                        </div>

                        <p className="font-bold text-slate-800 text-sm mb-3">Dapatkan Aplikasi SIPAKARAJA</p>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                alt="Google Play"
                                className="h-12"
                            />
                        </a>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#2D8A5B] py-4 text-center text-sm text-white">
                Copyright © 2026 RSUD Haji Makassar. Developed by Nailah Mujadiah and Chelsea Shelin P, Universitas Hasanuddin. All Rights Reserved.
            </div>
        </footer>
    );
}
