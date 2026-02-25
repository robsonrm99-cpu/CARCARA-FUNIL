import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Building, MapPin, DollarSign, User, Phone, ArrowRight, CheckCircle2, Sparkles, Map, Shield, Star, Clock, Hammer, MessageCircle, Lock, Car, Tractor, Truck, TrendingUp, Coins, Briefcase, Gift, Zap, Bell } from 'lucide-react';

type CategoryType = 'Imóvel' | 'Veículo' | 'Agrícola' | 'Pesados' | 'Investimento' | '';

interface LeadData {
  category: CategoryType;
  creditValue: number;
  investmentValue: number;
  installment: number;
  name: string;
  phone: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
};

const getCategoryLimits = (category: CategoryType) => {
  switch (category) {
    case 'Veículo':
      return { min: 20000, max: 500000, step: 5000, minLabel: 'R$ 20 mil', maxLabel: 'R$ 500 mil', default: 100000 };
    case 'Imóvel':
      return { min: 100000, max: 2000000, step: 10000, minLabel: 'R$ 100 mil', maxLabel: 'R$ 2 milhões', default: 250000 };
    case 'Agrícola':
      return { min: 100000, max: 5000000, step: 50000, minLabel: 'R$ 100 mil', maxLabel: 'R$ 5 milhões', default: 500000 };
    case 'Pesados':
      return { min: 100000, max: 2000000, step: 10000, minLabel: 'R$ 100 mil', maxLabel: 'R$ 2 milhões', default: 300000 };
    case 'Investimento':
      return { min: 50000, max: 5000000, step: 50000, minLabel: 'R$ 50 mil', maxLabel: 'R$ 5 milhões', default: 200000 };
    default:
      return { min: 50000, max: 2000000, step: 10000, minLabel: 'R$ 50 mil', maxLabel: 'R$ 2 milhões', default: 250000 };
  }
};

const testimonials = [
  { text: "Consegui planejar a troca da minha frota pagando parcelas justas e sem juros abusivos.", author: "Roberto S., Empresário" },
  { text: "Achei que demorava muito, mas a estratégia que montaram me fez ser contemplada rápido!", author: "Mariana C., Médica" },
  { text: "O atendimento foi excepcional. Entenderam minha necessidade e montaram o plano perfeito para minha casa própria.", author: "Carlos M., Engenheiro" },
  { text: "Nunca pensei que seria tão fácil investir no agronegócio. A Carcará me deu a visão que eu precisava.", author: "Ana P., Produtora Rural" },
  { text: "Simulação rápida e transparente. Sem letras miúdas. Recomendo para quem quer investir com segurança.", author: "Felipe R., Investidor" },
  { text: "Comprei meu primeiro carro zero km graças ao planejamento da Carcará. Melhor decisão que tomei.", author: "Juliana F., Professora" }
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-stone-50">
      {/* Full Page Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
        <img 
          src="https://res.cloudinary.com/dd9ukgdgc/image/upload/v1772027940/ChatGPT_Image_25_02_2026_10_42_13_y760mt.png" 
          alt="Carcará Background" 
          className="w-[140%] max-w-none md:w-[70%] md:max-w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-100/50 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-orange-100/40 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -70, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-brand-50/60 blur-[130px]"
      />
    </div>
  );
};

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <img 
      src="https://res.cloudinary.com/dd9ukgdgc/image/upload/v1772027940/ChatGPT_Image_25_02_2026_10_42_13_y760mt.png" 
      alt="Carcará Consórcios" 
      className="h-12 md:h-16 w-auto object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LeadData>({
    category: '',
    creditValue: 250000,
    investmentValue: 4000,
    installment: 1500,
    name: '',
    phone: '',
  });

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [notification, setNotification] = useState<{name: string, action: string, time: string} | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const names = [
      'Carlos M.', 'Ana P.', 'Roberto S.', 'Juliana F.', 'Marcos T.', 'Felipe R.', 'Amanda C.',
      'João B.', 'Maria S.', 'Pedro H.', 'Camila L.', 'Lucas V.', 'Fernanda D.', 'Rafael G.',
      'Beatriz N.', 'Thiago C.', 'Letícia M.', 'Bruno A.', 'Larissa K.', 'Diego F.', 'Patrícia O.',
      'Ricardo E.', 'Vanessa W.', 'Gustavo P.', 'Carolina R.', 'Eduardo M.', 'Natália S.',
      'Sérgio L.', 'Renata B.', 'Marcelo D.', 'Aline F.', 'Vitor C.', 'Tatiana M.', 'Leonardo P.'
    ];
    const actions = ['acabou de simular um Imóvel', 'garantiu um Veículo', 'iniciou plano Agrícola', 'simulou Pesados', 'reservou uma cota'];
    const times = ['agora mesmo', 'há 1 min', 'há 2 min'];

    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setNotification({ name: randomName, action: randomAction, time: randomTime });

      setTimeout(() => setNotification(null), 5000);
    };

    const interval = setInterval(showRandomNotification, 12000);
    setTimeout(showRandomNotification, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const updateData = (fields: Partial<LeadData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const generateWhatsAppLink = () => {
    const text = `🦅 *Simulação Carcará Consórcios* 🦅\n\nOlá, me chamo *${data.name}*.\nTenho interesse no segmento: *${data.category}*.\n\n📊 *Meu Planejamento:*\n- Crédito desejado: *${formatCurrency(data.creditValue)}*\n- Valor de entrada disponível: *${formatCurrency(data.investmentValue)}*\n- Parcela ideal: *${formatCurrency(data.installment)}*\n\nGostaria de receber minha simulação gratuita e conhecer as ofertas para novos clientes!`;
    
    // Usando a API oficial do WhatsApp com o número para garantir que o texto seja preenchido.
    // Links curtos (wa.me/message/...) bloqueiam o preenchimento automático de texto.
    return `https://api.whatsapp.com/send?phone=558791979369&text=${encodeURIComponent(text)}`;
  };

  const handleFinalSubmit = () => {
    window.open(generateWhatsAppLink(), '_blank');
    setStep(7); // Loading/Redirect step
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center space-y-5 md:space-y-8 max-w-4xl px-4 w-full"
          >
            {/* Promo Banner with Timer */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-red-500/10 text-red-600 px-4 py-2 md:px-5 md:py-3 rounded-2xl sm:rounded-full border border-red-500/20 shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Gift size={16} className="animate-bounce" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Oferta Exclusiva Liberada</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-red-500/30" />
              <div className="flex items-center space-x-1.5 bg-red-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                <Clock size={12} />
                <span className="text-xs font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-sans font-black text-slate-900 leading-[1.1] tracking-tight text-balance">
              O atalho <span className="text-brand-600">definitivo</span> para a sua conquista.
            </h1>
            
            <p className="text-sm md:text-xl text-slate-600 font-medium max-w-2xl text-balance px-2">
              Crédito inteligente sem juros abusivos. Descubra seu poder de compra.
            </p>

            {/* Compact Hooks / Triggers for Mobile */}
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl pt-2 pb-2">
              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-100 shadow-sm">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase">Sem Juros</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-100 shadow-sm">
                <Shield size={16} className="text-blue-500" />
                <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase">Negativados</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-100 shadow-sm">
                <Briefcase size={16} className="text-brand-500" />
                <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase">Especialistas</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="group relative w-full sm:w-auto px-8 py-4 md:px-12 md:py-6 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-black text-lg md:text-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">Fazer Simulação</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Testimonials */}
            <div className="w-full max-w-2xl pt-6 pb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Mais de 5.000 clientes satisfeitos</p>
              <div className="relative h-36 sm:h-32 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
                  >
                    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm h-full flex flex-col justify-between">
                      <div>
                        <div className="flex space-x-1 text-brand-500 mb-2">
                          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <p className="text-xs text-slate-600 italic font-medium">"{testimonials[testimonialIndex].text}"</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-900 mt-2 uppercase tracking-wide">- {testimonials[testimonialIndex].author}</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm hidden sm:flex flex-col justify-between h-full">
                      <div>
                        <div className="flex space-x-1 text-brand-500 mb-2">
                          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <p className="text-xs text-slate-600 italic font-medium">"{testimonials[(testimonialIndex + 1) % testimonials.length].text}"</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-900 mt-2 uppercase tracking-wide">- {testimonials[(testimonialIndex + 1) % testimonials.length].author}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-6 w-full max-w-md px-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Qual é o seu alvo?</h2>
              <p className="text-slate-500 font-medium">Escolha o segmento desejado.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'Imóvel', icon: Home, desc: 'Casa, Apto ou Terreno' },
                { id: 'Veículo', icon: Car, desc: 'Carros e Motos' },
                { id: 'Agrícola', icon: Tractor, desc: 'Máquinas e Insumos' },
                { id: 'Pesados', icon: Truck, desc: 'Caminhões e Frotas' },
                { id: 'Investimento', icon: TrendingUp, desc: 'Aumento de Patrimônio' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const limits = getCategoryLimits(item.id as CategoryType);
                    updateData({ 
                      category: item.id as CategoryType,
                      creditValue: limits.default
                    });
                    handleNext();
                  }}
                  className={`group flex items-center p-4 border-2 rounded-2xl transition-all duration-200 text-left ${
                    data.category === item.id
                      ? 'border-brand-600 bg-brand-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-3 rounded-xl mr-4 transition-colors ${data.category === item.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-600'}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{item.id}</h3>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        const limits = getCategoryLimits(data.category);
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8 w-full max-w-md px-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Valor do Crédito</h2>
              <p className="text-slate-500 font-medium">Quanto você precisa para realizar este objetivo?</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="space-y-6">
                <div className={`font-black text-brand-600 text-center tracking-tighter ${data.creditValue >= 1000000 ? 'text-4xl sm:text-5xl' : 'text-5xl'}`}>
                  {formatCurrency(data.creditValue)}
                </div>
                <input
                  type="range"
                  min={limits.min}
                  max={limits.max}
                  step={limits.step}
                  value={data.creditValue}
                  onChange={(e) => updateData({ creditValue: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{limits.minLabel}</span>
                  <span>{limits.maxLabel}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-5 bg-slate-900 hover:bg-brand-600 text-white rounded-full font-bold text-xl transition-all shadow-xl"
            >
              Avançar
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8 w-full max-w-md px-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Valor de Entrada</h2>
              <p className="text-slate-500 font-medium">Qual valor você tem disponível para investir agora?</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="space-y-6">
                <div className="text-5xl font-black text-brand-600 text-center tracking-tighter">
                  {formatCurrency(data.investmentValue)}
                </div>
                <input
                  type="range"
                  min={4000}
                  max={500000}
                  step={1000}
                  value={data.investmentValue}
                  onChange={(e) => updateData({ investmentValue: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>R$ 4 mil</span>
                  <span>R$ 500 mil</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-5 bg-slate-900 hover:bg-brand-600 text-white rounded-full font-bold text-xl transition-all shadow-xl"
            >
              Avançar
            </button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8 w-full max-w-md px-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Investimento Mensal</h2>
              <p className="text-slate-500 font-medium">Qual parcela cabe confortavelmente no seu bolso?</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="space-y-6">
                <div className="text-5xl font-black text-brand-600 text-center tracking-tighter">
                  {formatCurrency(data.installment)}
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={data.installment}
                  onChange={(e) => updateData({ installment: Number(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>R$ 500</span>
                  <span>R$ 20.000</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-5 bg-slate-900 hover:bg-brand-600 text-white rounded-full font-bold text-xl transition-all shadow-xl"
            >
              Avançar
            </button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8 w-full max-w-md px-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Último passo</h2>
              <p className="text-slate-500 font-medium">Para onde enviamos seu plano estratégico?</p>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="text-slate-400 group-focus-within:text-brand-600 transition-colors" size={22} />
                </div>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateData({ name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-brand-600 outline-none transition-all text-lg font-medium shadow-sm"
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Phone className="text-slate-400 group-focus-within:text-brand-600 transition-colors" size={22} />
                </div>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  placeholder="Seu WhatsApp"
                  className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-brand-600 outline-none transition-all text-lg font-medium shadow-sm"
                />
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={!data.name.trim() || data.phone.length < 10}
              className="group relative w-full py-5 bg-brand-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-brand-700 text-white rounded-full font-black text-xl transition-all shadow-xl flex items-center justify-center space-x-3"
            >
              <span>Receber Plano Exclusivo</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <Lock size={14} />
              <p className="text-xs font-bold uppercase tracking-widest">Dados Seguros</p>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col space-y-8 w-full max-w-md px-4"
          >
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Plano Gerado!</h2>
              <p className="text-slate-500 font-medium">Sua estratégia está pronta.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Alvo</span>
                <span className="font-black text-slate-900">{data.category}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Crédito</span>
                <span className="font-black text-brand-600">{formatCurrency(data.creditValue)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Entrada</span>
                <span className="font-black text-slate-900">{formatCurrency(data.investmentValue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Parcela</span>
                <span className="font-black text-slate-900">{formatCurrency(data.installment)}</span>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              className="w-full py-5 bg-[#25D366] hover:bg-[#1ebd5c] text-white rounded-full font-black text-xl transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center space-x-3"
            >
              <MessageCircle size={24} />
              <span>Falar com Especialista</span>
            </button>
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-8 w-full max-w-md px-4"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-48 h-auto mb-2"
            >
              <img 
                src="https://res.cloudinary.com/dd9ukgdgc/image/upload/v1772027940/ChatGPT_Image_25_02_2026_10_42_13_y760mt.png" 
                alt="Carcará Logo" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="space-y-3">
              <h2 className="text-4xl font-sans font-bold text-slate-900">Voo Iniciado, {data.name.split(' ')[0]}!</h2>
              <p className="text-slate-600 text-xl leading-relaxed">
                Nossa equipe de especialistas está preparando sua simulação exclusiva com visão de águia.
              </p>
            </div>
            <div className="w-full space-y-4">
              <div className="w-full bg-slate-200/50 rounded-full h-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="bg-brand-600 h-full rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                />
              </div>
              <p className="text-sm font-bold text-brand-600 uppercase tracking-[0.3em] animate-pulse">
                Redirecionando para o WhatsApp...
              </p>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-slate-400 hover:text-brand-600 font-bold text-xs uppercase tracking-widest transition-colors pt-4"
              >
                <span>Clique aqui se a janela não abriu</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-200 selection:text-brand-900 overflow-x-hidden">
      <div className="noise" />
      <AnimatedBackground />

      {/* Header / Progress */}
      <AnimatePresence>
        {step > 0 && step < 7 && (
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 md:p-6"
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between glass px-4 py-3 md:px-6 md:py-4 rounded-full md:rounded-[2rem]">
              <button 
                onClick={handleBack}
                className="text-slate-500 hover:text-brand-600 transition-colors text-xs md:text-sm font-bold uppercase tracking-widest flex items-center space-x-2"
              >
                <span>Voltar</span>
              </button>

              
              <div className="flex-1 mx-4 sm:mx-8">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>
              <span className="text-slate-400 text-xs font-black tracking-tighter">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 flex items-center justify-center p-6 pb-12 ${step === 0 ? 'pt-6' : 'pt-24'}`}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <AnimatePresence>
        {step === 0 && (
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 text-center"
          >
             <div className="flex flex-col items-center space-y-6">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  © 2024 Carcará Consórcios • Visão de Águia para Seus Investimentos • Todos os direitos reservados
                </p>
             </div>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* Live Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-4 z-50 bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center space-x-3 max-w-[280px]"
          >
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
              <Bell size={18} className="text-brand-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600 leading-tight">
                <span className="font-bold text-slate-900">{notification.name}</span> {notification.action}
              </p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{notification.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
