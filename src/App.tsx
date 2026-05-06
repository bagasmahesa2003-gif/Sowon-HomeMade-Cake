import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Star, Truck, CakeSlice, ShoppingBag, ShieldCheck, Heart, Sparkles, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';

const PRODUCTS = [
  {
    id: 'choc',
    name: 'Chocolate Truffle',
    price: 35000,
    desc: 'Kue cokelat hitam yang kaya rasa, dengan lapisan ganache yang lembut dan halus.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
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
                className="w-full max-w-2xl bg-[#FCFAF8] p-5 sm:p-10 md:p-12 rounded-[24px] sm:rounded-[32px] shadow-[0_8px_40px_rgba(62,39,35,0.15)] flex flex-col items-center border border-white"
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
                  <span className="block text-[28px] sm:text-[44px] md:text-[52px]">Selamat Datang</span>
                  <span className="block text-[22px] sm:text-[32px] md:text-[36px] my-2 text-[#6c804b] font-medium">Di</span>
                  <span className="block text-[26px] sm:text-[40px] md:text-[46px]">Sowon Homemade Cake</span>
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-2 sm:mb-3 text-brown">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-sans text-[11px] sm:text-[13px] text-brown/80 leading-tight">Favorit banyak pelanggan</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-2 sm:mb-3 text-brown">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-sans text-[11px] sm:text-[13px] text-brown/80 leading-tight">Siap delivery ke seluruh kota</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f5efe9] flex items-center justify-center mb-2 sm:mb-3 text-brown">
                      <CakeSlice className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-sans text-[11px] sm:text-[13px] text-brown/80 leading-tight">Fresh dibuat setiap hari</span>
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

      <aside className="bg-white border-b lg:border-b-0 lg:border-r border-brown/10 p-[20px] lg:p-[40px_30px] flex flex-col justify-between overflow-y-auto shrink-0 h-auto lg:h-full gap-[20px] lg:gap-[30px] z-10 shadow-sm lg:shadow-none">
        <div className="hero">
          <h1 className="text-[28px] lg:text-[32px] leading-[1.2] mb-[10px] lg:mb-[15px] text-brown font-serif">Sowon HomeMade Cake</h1>
          <p className="font-sans text-[14px] leading-[1.6] text-light-brown mb-[30px]">
            Kue dengan berbagai rasa favorit yang dibuat dari bahan berkualitas, cocok banget buat nemenin setiap momen kamu, dari santai sampai yang spesial
          </p>
        </div>

        <div className="hidden lg:block cart-section border-t-2 border-cream pt-[30px]">
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

      <div className="relative h-full w-full flex-1 overflow-hidden bg-[#FCFAF8]">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[6px] opacity-60 scale-[1.05]"
          style={{ backgroundImage: 'url("/background.png")' }}
        />
        <main className="absolute inset-0 p-[20px] lg:p-[30px] overflow-y-auto z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px] pb-[80px] lg:pb-0">
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

        {/* Mobile Floating Cart */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="lg:hidden fixed bottom-[20px] left-[20px] right-[20px] bg-white rounded-[16px] shadow-[0_8px_30px_rgba(62,39,35,0.15)] p-[16px] border border-brown/10 z-50 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[12px] text-light-brown font-sans">{totalItems} Items</span>
                <span className="text-[16px] font-bold text-brown font-serif">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="px-[20px] py-[12px] bg-leafy-green text-white border-none rounded-[8px] text-[13px] font-bold cursor-pointer font-sans uppercase tracking-[1px] hover:bg-leafy-green/90 transition-all duration-300 flex items-center gap-2"
              >
                Order <ShoppingBag className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
