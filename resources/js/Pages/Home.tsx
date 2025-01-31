import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Juice } from '@/types';
import { motion } from 'framer-motion';

// Animation settings
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.85 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { duration: 0.7, ease: "easeOut", type: "spring", stiffness: 140 }
    }
};

export default function Dashboard({ juices }: { juices: Juice[] }) {
    return (
        <AppLayout
            header={
                <motion.h2 
                    className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 tracking-wide text-center drop-shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Welcome to <span className="uppercase">TheJuice! 🧃</span>
                </motion.h2>
            }
        >
            <Head title="TheJuice" />

            {/* Animated Background Glow */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
                <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_center,_rgba(255,94,0,0.1)_0%,_rgba(0,0,0,0)_60%)]"></div>

                <motion.ul 
                    className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {juices.map((juice) => (
                        <motion.li 
                            className="p-4" 
                            key={juice.id}
                            variants={cardVariants}
                        >
                            <Link href={route('juice.show', { juice: juice.id })}>
                                <motion.div 
                                    whileHover={{ 
                                        scale: 1.08, 
                                        boxShadow: "0px 12px 25px rgba(255, 94, 0, 0.4)" 
                                    }} 
                                    whileTap={{ scale: 0.95 }}
                                    className="overflow-hidden bg-white/70 backdrop-blur-xl shadow-xl rounded-xl dark:bg-gray-800/70 border border-gray-300/30 dark:border-gray-600/30 transition-all relative"
                                >
                                    {/* Neon Glow on Hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 opacity-0 rounded-xl"
                                        whileHover={{ opacity: 0.15 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    
                                    <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center gap-4">
                                        <motion.img
                                            src={`/juices/${juice.image}`}
                                            alt={juice.name}
                                            className="w-48 h-48 object-cover rounded-lg"
                                            whileHover={{ rotate: 3, scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <p className="text-lg font-semibold">{juice.name}</p>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                                            NGN {juice.price.toLocaleString()}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </AppLayout>
    );
}
