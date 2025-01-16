'use client';

import {Api} from '@/shared/services/api-client';
import {IStory} from '@/shared/services/stories';
import React from 'react';
import {Container} from './container';
import {cn} from '@/shared/lib/utils';
import {X} from 'lucide-react';
import ReactStories from 'react-insta-stories';

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({className}) => {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        fetchStories();
    }, []);

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };

    return (
        <>
            <Container
                className={cn('flex items-center justify-between gap-2 my-10 overflow-x-scroll max-w-[1280px] px-4 sm:px-8', className)}>
                {stories.length === 0 &&
                    [...Array(6)].map((_, index) => (
                        <div key={index}
                             className="w-[100px] h-[150px]
               md:w-[180px] md:h-[230px]
               lg:w-[200px] lg:h-[250px] bg-gray-200 rounded-md animate-pulse overflow-hidden"/>
                    ))}

                {stories.map((story) => (
                    <img
                        key={story.id}
                        onClick={() => onClickStory(story)}
                        className="rounded-md cursor-pointer object-cover transition-transform hover:scale-105
                        w-[100px] h-[150px]
               md:w-[180px] md:h-[230px]
               lg:w-[200px] lg:h-[250px]"
                        src={story.previewImageUrl}
                    />
                ))}

                {open && (
                    <div className="fixed bg-fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-40">
                        <div className="relative max-w-[520px]">
                            <button style={{zIndex: 1000}} className="absolute right-5 top-5 z-50" onClick={() => setOpen(false)}>
                                <X className="absolute top-0 right-0 w-8 h-8 text-white/50"/>
                            </button>

                            <ReactStories
                                currentIndex={20}
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map((item) => ({url: item.sourceUrl})) || []}
                                defaultInterval={3000}
                                width={320}
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};
