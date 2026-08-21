"use client";
import { useState } from 'react';

type Language = 'en' | 'hi';

interface FoodItem {
    id: string;
    nameEn: string;
    nameHi: string;
    icon: string;
    isHealthy: boolean;
    reasonEn: string;
    reasonHi: string;
}

interface HabitItem {
    id: string;
    nameEn: string;
    nameHi: string;
    icon: string;
    isSafe: boolean;
    tipEn: string;
    tipHi: string;
}

const FOOD_ITEMS: FoodItem[] = [
    { id: 'palak', nameEn: 'Palak / Leafy Greens', nameHi: 'पालक और हरी सब्ज़ियां', icon: '🥬', isHealthy: true, reasonEn: 'Rich in Folic Acid for baby brain development.', reasonHi: 'फोलिक एसिड से भरपूर - बच्चे के दिमाग के लिए बहुत जरूरी।' },
    { id: 'milk', nameEn: 'Milk & Dahi (Curd)', nameHi: 'दूध और दही', icon: '🥛', isHealthy: true, reasonEn: 'Provides Calcium & Protein for strong baby bones.', reasonHi: 'कैल्शियम और प्रोटीन से भरपूर - हड्डियों को मजबूत बनाता है।' },
    { id: 'dal', nameEn: 'Dal & Chana (Pulses)', nameHi: 'दाल और चना', icon: '🍲', isHealthy: true, reasonEn: 'Essential plant protein for cell growth.', reasonHi: 'प्रोटीन का बेहतरीन स्रोत - बच्चे के विकास में मददगार।' },
    { id: 'iron_tab', nameEn: 'Iron & Folic Acid Tablet', nameHi: 'आयरन और फोलिक एसिड गोली', icon: '💊', isHealthy: true, reasonEn: 'Prevents anemia and boosts hemoglobin.', reasonHi: 'खून की कमी (एनीमिया) से बचाता है।' },
    { id: 'raw_papaya', nameEn: 'Raw Unripe Papaya', nameHi: 'कच्चा पपीता', icon: '🥭', isHealthy: false, reasonEn: 'Contains latex that can trigger uterine contractions.', reasonHi: 'गर्भाशय में संकुचन पैदा कर सकता है - शुरुआती महीनों में बचें।' },
    { id: 'junk_food', nameEn: 'Excess Chai / Caffeine', nameHi: 'ज्यादा चाय या कॉफी', icon: '☕', isHealthy: false, reasonEn: 'High caffeine can affect baby heart rate & iron absorption.', reasonHi: 'आयरन के अवशोषण को कम करता है - सीमित मात्रा में लें।' },
];

const HABIT_ITEMS: HabitItem[] = [
    { id: 'water', nameEn: 'Drink 3L Water Daily', nameHi: 'रोज 3 लीटर पानी पिएं', icon: '💧', isSafe: true, tipEn: 'Keeps amniotic fluid levels healthy and prevents UTI.', tipHi: 'गर्भजल का स्तर सही रखता है और इन्फेक्शन से बचाता है।' },
    { id: 'walk', nameEn: '30 Mins Gentle Walk', nameHi: '30 मिनट हल्की सैर', icon: '🚶‍♀️', isSafe: true, tipEn: 'Improves blood circulation & helps normal delivery.', tipHi: 'ब्लड सर्कुलेशन बेहतर बनाता है और नॉर्मल डिलीवरी में मदद करता है।' },
    { id: 'sleep', nameEn: '8-10 Hours Rest (Left Side)', nameHi: 'बाईं करवट 8-10 घंटे नींद', icon: '😴', isSafe: true, tipEn: 'Sleeping on left side maximizes blood flow to baby.', tipHi: 'बाईं तरफ सोने से बच्चे को भरपूर ऑक्सीजन और पोषण मिलता है।' },
    { id: 'heavy_lifting', nameEn: 'Lifting Heavy Buckets', nameHi: 'भारी बाल्टी या वजन उठाना', icon: '🏋️‍♀️', isSafe: false, tipEn: 'Puts strain on abdomen and pelvic muscle.', tipHi: 'पेट और कमर पर दबाव डालता है - भारी वजन न उठाएं।' },
    { id: 'self_meds', nameEn: 'Taking Meds without Doctor', nameHi: 'बिना डॉक्टर सलाह दवा लेना', icon: '🛑', isSafe: false, tipEn: 'Some OTC medicines can affect baby development.', tipHi: 'हमेशा डॉक्टर से पूछकर ही कोई दवा लें।' },
];

export default function PregnancyGame() {
    const [lang, setLang] = useState<Language>('hi'); // Default Hindi for rural accessibility
    const [trimester, setTrimester] = useState<1 | 2 | 3>(1);
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
    const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ msg: string; success: boolean } | null>(null);

    const toggleFood = (food: FoodItem) => {
        if (selectedFoods.includes(food.id)) {
            setSelectedFoods(selectedFoods.filter(id => id !== food.id));
        } else {
            setSelectedFoods([...selectedFoods, food.id]);
            if (food.isHealthy) {
                setFeedback({
                    msg: lang === 'hi' ? `✅ सही चुनाव! ${food.reasonHi}` : `✅ Great Choice! ${food.reasonEn}`,
                    success: true
                });
            } else {
                setFeedback({
                    msg: lang === 'hi' ? `⚠️ सावधान! ${food.reasonHi}` : `⚠️ Precaution Needed! ${food.reasonEn}`,
                    success: false
                });
            }
        }
    };

    const toggleHabit = (habit: HabitItem) => {
        if (selectedHabits.includes(habit.id)) {
            setSelectedHabits(selectedHabits.filter(id => id !== habit.id));
        } else {
            setSelectedHabits([...selectedHabits, habit.id]);
            if (habit.isSafe) {
                setFeedback({
                    msg: lang === 'hi' ? `✅ शाबाश! ${habit.tipHi}` : `✅ Well Done! ${habit.tipEn}`,
                    success: true
                });
            } else {
                setFeedback({
                    msg: lang === 'hi' ? `🛑 रुकें! ${habit.tipHi}` : `🛑 Caution! ${habit.tipEn}`,
                    success: false
                });
            }
        }
    };

    const healthyCount = selectedFoods.filter(id => FOOD_ITEMS.find(f => f.id === id)?.isHealthy).length +
        selectedHabits.filter(id => HABIT_ITEMS.find(h => h.id === id)?.isSafe).length;

    return (
        <div className="bg-gradient-to-br from-rose-50 via-peach-50 to-primary-50 rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-white relative overflow-hidden my-8">
            {/* Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-200/60">
                <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl animate-bounce">🤰</span>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900">
                            {lang === 'hi' ? 'सुरक्षित गर्भावस्था यात्रा खेल' : 'Safe Pregnancy Journey Game'}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">
                            {lang === 'hi' ? 'मां और बच्चे की सेहत का इंटरएक्टिव गाइड' : 'Interactive Mother & Baby Wellness Guide'}
                        </p>
                    </div>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center bg-white rounded-full p-1 border border-primary-200 shadow-sm">
                    <button
                        onClick={() => setLang('hi')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'hi' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        🇮🇳 हिंदी
                    </button>
                    <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        🌐 English
                    </button>
                </div>
            </div>

            {/* Trimester Timeline Bar */}
            <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-primary-700 uppercase mb-3 text-center sm:text-left">
                    {lang === 'hi' ? '१. गर्भावस्था का महीना चुनें (Select Stage):' : '1. Choose Pregnancy Stage:'}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <button
                        onClick={() => setTrimester(1)}
                        className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 ${trimester === 1 ? 'bg-white border-primary-500 shadow-lg scale-102 ring-2 ring-primary-300' : 'bg-white/60 border-transparent hover:bg-white'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xl sm:text-2xl">🍋</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">M 1-3</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{lang === 'hi' ? 'पहला तिमाही' : '1st Trimester'}</p>
                        <p className="text-[10px] text-gray-500">{lang === 'hi' ? 'नींव और शुरुआती विकास' : 'Foundation & Heartbeat'}</p>
                    </button>

                    <button
                        onClick={() => setTrimester(2)}
                        className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 ${trimester === 2 ? 'bg-white border-primary-500 shadow-lg scale-102 ring-2 ring-primary-300' : 'bg-white/60 border-transparent hover:bg-white'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xl sm:text-2xl">🥭</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">M 4-6</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{lang === 'hi' ? 'दूसरा तिमाही' : '2nd Trimester'}</p>
                        <p className="text-[10px] text-gray-500">{lang === 'hi' ? 'बच्चे की पहली हलचल' : 'Baby Kicks & Growth'}</p>
                    </button>

                    <button
                        onClick={() => setTrimester(3)}
                        className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 ${trimester === 3 ? 'bg-white border-primary-500 shadow-lg scale-102 ring-2 ring-primary-300' : 'bg-white/60 border-transparent hover:bg-white'}`}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xl sm:text-2xl">🍉</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">M 7-9</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{lang === 'hi' ? 'तीसरा तिमाही' : '3rd Trimester'}</p>
                        <p className="text-[10px] text-gray-500">{lang === 'hi' ? 'डिलीवरी की तैयारी' : 'Final Prep & Birth'}</p>
                    </button>
                </div>
            </div>

            {/* Live Feedback Banner */}
            {feedback && (
                <div className={`mb-6 p-3 sm:p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 animate-fade-in ${feedback.success ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                    <span className="text-xl shrink-0">{feedback.success ? '👩‍⚕️' : '👨‍⚕️'}</span>
                    <p className="flex-1">{feedback.msg}</p>
                    <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-gray-600 font-bold px-1">✕</button>
                </div>
            )}

            {/* Section 1: Healthy Thali Mini-Game */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 shadow-sm border border-rose-100">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                        <span>🍱</span>
                        {lang === 'hi' ? '२. पौष्टिक थाली चुनें (थैली पर टैप करें):' : '2. Build Healthy Thali (Tap items to select):'}
                    </h4>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                        {lang === 'hi' ? 'सही भोजन चुनें' : 'Pick Safe Foods'}
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {FOOD_ITEMS.map((food) => {
                        const isSelected = selectedFoods.includes(food.id);
                        return (
                            <button
                                key={food.id}
                                onClick={() => toggleFood(food)}
                                className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${isSelected
                                        ? food.isHealthy
                                            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                                            : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                                        : 'bg-white border-gray-200 hover:border-primary-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl sm:text-3xl">{food.icon}</span>
                                    {isSelected && (
                                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${food.isHealthy ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                                            {food.isHealthy ? '✓ Safe' : '✕ Avoid'}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs font-bold text-gray-900">{lang === 'hi' ? food.nameHi : food.nameEn}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Section 2: Daily Precautions Mini-Game */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 shadow-sm border border-rose-100">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                        <span>🛡️</span>
                        {lang === 'hi' ? '३. दैनिक सावधानियां और आदतें:' : '3. Daily Habits & Precautions:'}
                    </h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        {lang === 'hi' ? 'सुरक्षित विकल्प चुनें' : 'Select Safe Habits'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HABIT_ITEMS.map((habit) => {
                        const isSelected = selectedHabits.includes(habit.id);
                        return (
                            <button
                                key={habit.id}
                                onClick={() => toggleHabit(habit)}
                                className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${isSelected
                                        ? habit.isSafe
                                            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                                            : 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                                        : 'bg-white border-gray-200 hover:border-primary-300'
                                    }`}
                            >
                                <span className="text-2xl shrink-0">{habit.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-gray-900 truncate">{lang === 'hi' ? habit.nameHi : habit.nameEn}</p>
                                    <p className="text-[10px] text-gray-500">{lang === 'hi' ? (habit.isSafe ? 'सुरक्षित अभ्यास' : 'सावधानी बरतें') : (habit.isSafe ? 'Safe Routine' : 'Precaution')}</p>
                                </div>
                                {isSelected && (
                                    <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${habit.isSafe ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                                        {habit.isSafe ? '✓ Good' : '⚠️ Stop'}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Score & Reward Badge Footer */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-2xl shadow-md shrink-0">
                        🏅
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                            {lang === 'hi' ? 'सुरक्षित मां स्कोर' : 'Healthy Mother Score'}
                        </p>
                        <h4 className="text-lg font-serif font-bold text-gray-900">
                            {healthyCount} {lang === 'hi' ? 'सुरक्षित विकल्प चुने गए' : 'Safe Habits Selected'}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                            {lang === 'hi' ? 'डॉ. वैभवी की सलाह से स्वस्थ और खुशहाल गर्भावस्था सुनिश्चित करें।' : 'Follow Dr. Vaibhavi’s guidance for a safe and happy delivery.'}
                        </p>
                    </div>
                </div>

                <a
                    href="https://wa.me/919321880359?text=Namaste%20Dr.%20Vaibhavi,%20I%20played%20the%20Pregnancy%20Guide%20game%20on%20your%20website%20and%20want%20to%20consult%20about%20my%20pregnancy."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>💬</span>
                    {lang === 'hi' ? 'डॉ. वैभवी से व्हाट्सएप पर पूछें' : 'Ask Dr. Vaibhavi on WhatsApp'}
                </a>
            </div>
        </div>
    );
}
