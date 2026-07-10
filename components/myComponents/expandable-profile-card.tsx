"use client"
import React, {useState} from 'react';
import {motion, AnimatePresence, LayoutGroup} from 'motion/react';
import Image from "next/image";

interface ExpandableCardProps {
    id: string;
    imageSrc?: string;
    title?: string;
    author?: string;
    body?: string;
    content?: React.ReactNode;
}

export default function ExpandableProfileCard({
                                                  id,
                                                  imageSrc = "/article.png",
                                                  title = "Jane Doe",
                                                  author = "Senior UX Designer",
                                                  content,
                                                  body
                                              }: ExpandableCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const layoutId = `expandable-profile-card-${id}`;

    return (
        <LayoutGroup id={id}>
            <motion.div
                layout
                onClick={() => setIsOpen(true)}
                className="cursor-pointer relative h-64 w-full overflow-hidden rounded-xl border border-border group shadow-sm"
                whileHover="hover"
            >
                <motion.div layoutId={`image-${layoutId}`} className="absolute inset-0 h-full w-full">
                    <Image
                        src={imageSrc}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        alt={title}
                        className="object-center"
                    />
                </motion.div>
                <div
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"/>
                <div
                    className="absolute bottom-0 left-0 p-5 sm:p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md">
                    <motion.p layoutId={`subtitle-${layoutId}`}
                              className="text-foreground text-xs font-medium tracking-wide uppercase mb-1.5">{author}</motion.p>
                    <motion.h3 layoutId={`title-${layoutId}`}
                               className="text-lg sm:text-xl font-semibold tracking-tight text-muted-foreground">{title}</motion.h3>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />
                        <motion.div
                            layoutId={layoutId}
                            className="relative w-full max-w-4xl h-[80vh] bg-card rounded-2xl overflow-hidden border border-border z-10 flex flex-col md:flex-row shadow-xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-background/50 hover:bg-accent rounded-full border border-border text-foreground transition-colors backdrop-blur-sm"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"/>
                                    <path d="m6 6 12 12"/>
                                </svg>
                            </button>

                            <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
                                <motion.img
                                    layoutId={`image-${layoutId}`}
                                    src={imageSrc}
                                    className="h-full w-full object-fill"
                                />
                                <div
                                    className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden"/>
                            </div>

                            <div
                                className="p-6 sm:p-8 w-full md:w-1/2 flex flex-col h-full overflow-y-auto custom-scrollbar">
                                <motion.p layoutId={`subtitle-${layoutId}`}
                                          className="text-chart-1 text-xs font-medium tracking-wide uppercase mb-3">{author}</motion.p>
                                <motion.h3 layoutId={`title-${layoutId}`}
                                           className="text-2xl sm:text-3xl font-semibold tracking-tight text-chart-1 mb-6 pb-4 border-b border-border">{title}</motion.h3>

                                <motion.div
                                    initial={{opacity: 0, x: 20}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: 10}}
                                    transition={{delay: 0.2}}
                                    className="text-foreground/80 text-sm leading-relaxed grow flex flex-col"
                                >
                                    {content || (
                                        <div className="flex flex-col gap-6 grow">
                                            <div>
                                                <h4 className="text-chart-1 font-semibold tracking-tight mb-2">Background</h4>
                                                <p className="text-muted-foreground">{body}</p>
                                            </div>

                                            <div className="mt-auto flex justify-end">
                                                <button
                                                    className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm">
                                                    see more
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
}

