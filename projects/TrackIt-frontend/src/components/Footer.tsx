import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-emerald-500">
              <Package className="h-8 w-8" />
              <span className="text-xl font-semibold">TrackIt</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Ensuring authenticity and transparency in Nigerian supply chains through blockchain technology.
              Track, verify, and secure your products from source to destination.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="mailto:contact@supplychain.com" icon={<Mail className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <FooterLink to="/track" text="Track Product" />
              <FooterLink to="/verify" text="Verify Authenticity" />
              <FooterLink to="/create" text="Register Product" />
              <FooterLink to="/supplier" text="Supplier Portal" />
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <FooterLink to="#" text="Documentation" />
              <FooterLink to="#" text="API Reference" />
              <FooterLink to="#" text="Contact Support" />
              <FooterLink to="#" text="Report Issue" />
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Supply Chain Track. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-emerald-500 transition-colors duration-200"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, text }: { to: string; text: string }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-emerald-500 transition-colors duration-200"
    >
      {text}
    </Link>
  </li>
);