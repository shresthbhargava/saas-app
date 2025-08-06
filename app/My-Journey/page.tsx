import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { getUserSessions, getUserCompanions } from '@/lib/actions/companion.actions'
import CompanionsList from '@/components/CompanionsList'

const MyJourney = async () => {
    const { userId } = await auth()
    
    if (!userId) {
        return <div>Please sign in to view your journey</div>
    }

    try {
        const [recentSessions, userCompanions] = await Promise.all([
            getUserSessions(userId, 10),
            getUserCompanions(userId)
        ])

        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        return (
            <div className="space-y-8">
                <h1>My Learning Journey</h1>
                
                <div className="grid gap-8 lg:grid-cols-2">
                    <CompanionsList 
                        title="Recent Sessions" 
                        companions={Array.isArray(recentSessions) && recentSessions.length > 0 && !Array.isArray(recentSessions[0])
                            ? recentSessions.map((session: any) => ({
                                id: session.id,
                                name: session.name,
                                subject: session.subject,
                                topic: session.topic,
                                duration: session.duration
                            }))
                            : []
                        }
                        classNames="lg:col-span-1"
                    />
                    
                    <CompanionsList 
                        title="My Companions" 
                        companions={userCompanions}
                        classNames="lg:col-span-1"
                    />
                </div>
            </div>
        )
    } catch (error) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-red-500">
                    Failed to load your journey data. Please try again later.
                </p>
            </div>
        )
    }
}

export default MyJourney