import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Star, Truck, CakeSlice, ShoppingBag, ShieldCheck, Heart, Sparkles, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';

const PRODUCTS = [
  {
    id: 'choc',
    name: 'Naual Truffle',
    price: 35000,
    desc: 'Kue cokelat hitam yang kaya rasa, dengan lapisan ganache yang lembut dan halus.',
    image: 'data:image/jpeg;base64,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'
  },
  {
    id: 'van',
    name: 'Classic Vanilla',
    price: 30000,
    desc: 'Kue vanila yang ringan dan lembut, dengan buttercream Madagascar..',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'straw',
    name: 'Strawberry Shortcake',
    price: 32000,
    desc: 'Lapisan kue vanila yang diisi dengan stroberi segar dan krim kocok.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mat',
    name: 'Kyoto Matcha',
    price: 38000,
    desc: 'Lapisan kue dengan rasa teh hijau matcha premium, dengan rasa manis yang lembut.',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'chs',
    name: 'Basque Cheesecake',
    price: 32000,
    desc: 'Cheesecake Basque gaya New York yang creamy, dengan bagian atas yang terkaramelisasi.',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'rv',
    name: 'Red Velvet',
    price: 34000,
    desc: 'Kue red velvet khas dengan tekstur yang lembut, dilapisi frosting cream cheese yang kaya rasa.',
    image: 'https://outerbloom.com/cdn/shop/files/CLRKUE1005_Outerbloom-Red-Velvet-Nouget-Cak.jpg?v=1737450497'
  }
];

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Suppress "play() interrupted" errors to prevent red overlay in preview
  useEffect(() => {
    const suppressPlayInterrupted = (e: PromiseRejectionEvent) => {
      const msg = e.reason?.message || e.reason?.toString() || '';
      if (
        msg.includes('The play() request was interrupted') ||
        msg.includes("play() failed because the user didn't interact") ||
        msg.includes("NotAllowedError")
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', suppressPlayInterrupted);
    
    // Patch console.error to intercept internal ReactPlayer logs or Vite dev overlay catchers
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const msg = typeof args[0] === 'string' ? args[0] : (args[0]?.message || '');
      if (
        msg.includes('The play() request was interrupted') ||
        msg.includes("play() failed because the user didn't interact") ||
        msg.includes("NotAllowedError") ||
        (args[0] && args[0].name === 'NotAllowedError') ||
        (args[0] && args[0].name === 'AbortError')
      ) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    return () => {
      window.removeEventListener('unhandledrejection', suppressPlayInterrupted);
      console.error = originalConsoleError;
    };
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + (product?.price || 0) * qty;
  }, 0);

  const handleCheckout = () => {
    let orderText = `Hello, I'd like to order from Fresh Homemade Cake:\n\n`;
    let hasItems = false;
    PRODUCTS.forEach((p) => {
      if (cart[p.id]) {
        const qty = cart[p.id];
        orderText += `- ${p.name} (${qty}x): Rp ${(p.price * qty).toLocaleString('id-ID')}\n`;
        hasItems = true;
      }
    });

    if (!hasItems) {
      alert('Please add items to your cart first!');
      return;
    }

    orderText += `\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\n\nPlease confirm my order.`;
    const url = `https://wa.me/6285819410509?text=${encodeURIComponent(orderText)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Background Music Player (Hidden UI) */}
      <div className="hidden">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=aLqc8TdoVJ0"
          playing={isAudioPlaying}
          loop={true}
          volume={0.3}
          width="0"
          height="0"
        />
      </div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 overflow-y-auto font-serif text-text"
            onClickCapture={() => {
              if (!hasInteracted) {
                setHasInteracted(true);
                setIsAudioPlaying(true);
              }
            }}
          >
            {/* Blurred Background Image */}
            <div 
              className="fixed inset-0 bg-cover bg-center filter blur-[2px] scale-105 pointer-events-none"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=2000")' }}
            ></div>
            <div className="fixed inset-0 bg-cream/30 backdrop-blur-[1px] pointer-events-none"></div>

            <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 py-10">
              {/* Top Logo */}
              <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="flex flex-row justify-center items-center gap-3 mb-8"
              >
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 border-brown bg-white shadow-sm">
                   <img src="/vectorcoffe.png" alt="Sowon Logo" className="w-full h-full object-cover scale-110" />
                 </div>
                 <div className="flex flex-col items-start leading-none">
                   <span className="font-serif font-bold text-2xl text-brown">Sowon</span>
                   <span className="font-sans text-xs tracking-widest text-brown uppercase mt-1">Homemade Cake</span>
                 </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-2xl bg-[#FCFAF8] p-6 sm:p-10 md:p-12 rounded-[32px] shadow-[0_8px_40px_rgba(62,39,35,0.15)] flex flex-col items-center border border-white"
              >
              {/* Logo at top of card */}
              <div className="mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-brown bg-white shadow-sm">
                <img src="/Coffe.png" alt="Sowon Logo" className="w-full h-full object-cover scale-110" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full relative"
              >
                {/* Decorative sparkles */}
                <Sparkles className="absolute top-2 left-6 sm:left-16 md:left-20 w-4 h-4 text-brown/40" />
                <Sparkles className="absolute top-10 right-6 sm:right-16 md:right-20 w-5 h-5 text-brown/40" />

                <h1 className="leading-[1.1] mb-[24px] text-brown font-serif font-bold text-center w-full">
                  <span className="block text-[36px] sm:text-[44px] md:text-[52px]">Selamat Datang</span>
                  <span className="block text-[28px] sm:text-[32px] md:text-[36px] my-2 text-[#6c804b] font-medium">Di</span>
                  <span className="block text-[32px] sm:text-[40px] md:text-[46px] whitespace-nowrap">Sowon Homemade Cake</span>
                </h1>
                
                {/* Heart Divider */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-16 h-[1px] bg-brown/20"></div>
                  <Heart className="w-4 h-4 text-brown/40 fill-brown/40" />
                  <div className="w-16 h-[1px] bg-brown/20"></div>
                </div>

                <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-brown/80 text-center mb-[32px] max-w-lg mx-auto">
                  Nikmati kue homemade dengan rasa premium, dibuat dengan penuh cinta untuk setiap momen spesialmu.
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 w-full max-w-lg mx-auto">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-3 text-brown">
                      <Star className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[12px] sm:text-[13px] text-brown/80 leading-tight">Favorit banyak pelanggan</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-3 text-brown">
                      <Truck className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[12px] sm:text-[13px] text-brown/80 leading-tight">Siap delivery ke seluruh kota</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-3 text-brown">
                      <CakeSlice className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[12px] sm:text-[13px] text-brown/80 leading-tight">Fresh dibuat setiap hari</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                onClick={() => setShowWelcome(false)}
                className="px-[40px] py-[16px] bg-[#6c804b] text-white border-none rounded-[8px] text-[15px] font-bold cursor-pointer font-sans uppercase tracking-[1px] hover:bg-[#5b6e3f] hover:scale-105 hover:shadow-[0_8px_20px_rgba(108,128,75,0.4)] transition-all duration-300 flex items-center gap-3 mb-6"
              >
                MULAI BELANJA <ShoppingBag className="w-5 h-5" />
              </motion.button>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="flex items-center gap-2 text-brown/60 text-[13px] font-sans"
              >
                <ShieldCheck className="w-4 h-4" /> Kualitas terbaik, kepuasan terjamin <Heart className="w-3 h-3 fill-brown/60 text-brown/60" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        ) : (
          <motion.div 
            key="shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] h-screen overflow-hidden bg-cream text-text font-serif w-full"
            onClickCapture={() => {
              if (!hasInteracted) {
                setHasInteracted(true);
                setIsAudioPlaying(true);
              }
            }}
          >

      <aside className="bg-white border-b lg:border-b-0 lg:border-r border-brown/10 p-[40px_30px] flex flex-col justify-between overflow-y-auto shrink-0 h-auto lg:h-full gap-[30px] z-10 shadow-sm lg:shadow-none">
        <div className="hero">
          <h1 className="text-[32px] leading-[1.2] mb-[15px] text-brown font-serif">Sowon HomeMade Cake</h1>
          <p className="font-sans text-[14px] leading-[1.6] text-light-brown mb-[30px]">
            Kue dengan berbagai rasa favorit yang dibuat dari bahan berkualitas, cocok banget buat nemenin setiap momen kamu, dari santai sampai yang spesial
          </p>
        </div>

        <div className="cart-section border-t-2 border-cream pt-[30px]">
          <div className="cart-stats font-sans mb-[20px]">
            <div className="flex justify-between mb-[10px] text-[14px]">
              <span>Items Ordered</span>
              <span id="total-items">{totalItems}</span>
            </div>
            <div className="flex justify-between mt-[10px] text-[24px] font-bold text-brown">
              <span>Total</span>
              <span id="grand-total">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full p-[16px] bg-leafy-green text-white border-none rounded-[8px] text-[14px] font-bold cursor-pointer flex items-center justify-center gap-[10px] font-sans uppercase tracking-[1px] hover:bg-leafy-green/90 transition-colors"
          >
            Order via WhatsApp
          </button>
        </div>
      </aside>

      <main className="p-[30px] overflow-y-auto h-full w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px] pb-24 lg:pb-0">
          {PRODUCTS.map((product) => {
            const qty = cart[product.id] || 0;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[16px] p-[20px] shadow-[0_4px_15px_rgba(62,39,35,0.08)] border border-transparent hover:border-leafy-green transition-colors flex flex-col h-full group"
              >
                <div className="w-full h-[120px] rounded-[10px] mb-[15px] bg-cream flex items-center justify-center relative overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="cake-info flex-1">
                  <h3 className="text-[18px] mb-[4px] text-brown font-serif font-bold">{product.name}</h3>
                  <p className="font-sans text-[11px] text-light-brown mb-[12px] leading-[1.4] h-[32px] overflow-hidden">{product.desc}</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-[16px] text-leafy-green whitespace-nowrap mr-2">
                     Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <div className="flex items-center bg-cream rounded-[20px] p-[4px] shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-[28px] h-[28px] rounded-full border-none bg-white text-brown cursor-pointer font-bold text-[16px] flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="mx-[10px] text-[14px] font-sans min-w-[15px] text-center font-bold">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-[28px] h-[28px] rounded-full border-none bg-white text-brown cursor-pointer font-bold text-[16px] flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
