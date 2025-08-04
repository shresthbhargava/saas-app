import React from 'react'
import { getAllCompanions } from '@/lib/actions/companion.actions'
import CompanionsList from '@/components/CompanionsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CompanionsLibrary = async () => {
    try {
        const companions = await getAllCompanions({ limit: 20 });
        
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1>AI Companions Library</h1>
                    <Button asChild>
                        <Link href="/companions/new">
                            Create New Companion
                        </Link>
                    </Button>
                </div>
                
                {companions && companions.length > 0 ? (
                    <CompanionsList 
                        title="Available Companions" 
                        companions={companions}
                    />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground mb-4">
                            No companions available yet.
                        </p>
                        <Button asChild>
                            <Link href="/companions/new">
                                Create Your First Companion
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        )
    } catch (error) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-red-500 mb-4">
                    Failed to load companions. Please try again later.
                </p>
                <Button asChild>
                    <Link href="/companions/new">
                        Create New Companion
                    </Link>
                </Button>
            </div>
        )
    }
}

export default CompanionsLibrary