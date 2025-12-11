"use client";

import React from "react";
import Link from "next/link";
import { 
  Truck, 
  Users,
  HardHat,
  Globe,
  Clock,
  ArrowRight,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Permohonan Mudah",
      description: "Ajukan permohonan kendaraan dinas dengan proses yang cepat dan mudah melalui sistem digital."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Manajemen Efisien",
      description: "Kelola jadwal dan ketersediaan kendaraan operasional dengan sistem terintegrasi."
    },
    {
      icon: <HardHat className="w-12 h-12" />,
      title: "Pelayanan Terbaik",
      description: "Layanan permohonan kendaraan dinas yang responsif untuk mendukung operasional PLN."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Sistem Digital",
      description: "Teknologi modern untuk pengelolaan kendaraan dinas yang akurat dan real-time."
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section with Background Image */}
      <section className="relative h-[450px] bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden">
        {/* Hero Image - Full Background */}
        <div className="absolute inset-0">
          <img 
            src="/banner.png" 
            alt="PLN Workers Illustration" 
            className="absolute right-0 top-0 h-full w-auto object-cover"
            style={{ maxWidth: 'none' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sistem Permohonan<br />Kendaraan Dinas PLN
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Kelola permohonan kendaraan operasional dengan mudah dan efisien.
            </p>
            <Link href="/form">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded inline-flex items-center space-x-2 transition">
                <span>Lanjutkan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator at bottom right */}
        <div className="absolute bottom-8 right-8">
          <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white">
            <ChevronRight className="w-6 h-6 transform rotate-90" />
          </div>
        </div>
      </section>

      {/* Features Section - 4 Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 text-center hover:shadow-xl transition duration-300"
              >
                <div className="text-cyan-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-cyan-600 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Logistics Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="w-full h-96 flex items-center justify-center">
                <img 
                  src="/banner 3.png" 
                  alt="PLN Workers Illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                TripDoc PLN Manado
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sistem informasi permohonan kendaraan dinas operasional yang dirancang 
                khusus untuk PT PLN (Persero) UPT Manado. Memudahkan 
                proses pengajuan, persetujuan, dan monitoring kendaraan dinas secara digital.
              </p>

              {/* Intercontinental Transport */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-cyan-50 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Proses Terintegrasi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sistem terintegrasi dari pengajuan hingga persetujuan permohonan kendaraan dinas.
                  </p>
                </div>
              </div>

              {/* Fast Loading */}
              <div className="flex items-start space-x-4 mb-8">
                <div className="bg-cyan-50 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Proses Cepat
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Permohonan diproses dengan cepat untuk mendukung kelancaran operasional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Split Background */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Left Side - Cyan Background with Stats */}
          <div className="bg-cyan-500 text-white py-20 px-8 lg:px-16 flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-2">Melayani Dengan Sepenuh Hati</h3>
            <h2 className="text-4xl font-bold mb-8">
              Sistem Andal<br />Untuk PLN
            </h2>
            <p className="text-white/90 mb-12 max-w-md">
              TripDoc hadir untuk mendukung operasional PT PLN (Persero) UPT Manado 
              dengan sistem manajemen kendaraan dinas yang modern, efisien, dan mudah digunakan.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <Building2 className="w-12 h-12 mx-auto mb-3" />
                <h4 className="text-sm font-semibold mb-1">Unit Kerja</h4>
                <p className="text-5xl font-bold">1</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h4 className="text-sm font-semibold mb-1">Pengguna Aktif</h4>
                <p className="text-5xl font-bold">50+</p>
              </div>
              <div className="text-center">
                <Truck className="w-12 h-12 mx-auto mb-3" />
                <h4 className="text-sm font-semibold mb-1">Kendaraan Dinas</h4>
                <p className="text-5xl font-bold">15+</p>
              </div>
            </div>
          </div>

          {/* Right Side - Dark Blue Background with Banner */}
          <div className="bg-blue-900 relative overflow-hidden">
            {/* Banner image */}
            <img 
              src="/banner 2.png" 
              alt="PLN Workers" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2">
              © 2025 TripDoc - PT PLN (Persero) UPT Manado
            </p>
            <p className="text-sm">
              Sistem Permohonan Kendaraan Dinas Operasional
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
