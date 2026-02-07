import React from 'react'
import { Button } from '../ui/button'
import { Crown } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const Upgrade = () => {
    const upgradePlan = async () => {

        await authClient.checkout({
            products: [
                "5c98fa24-6775-4211-bde3-afd62b3aa124",
                "eaaed45a-d03e-44c9-ae1e-cec5378fbd0d",
                "82b0ebbe-abeb-4929-a565-562f69506eb8"
            ]
        })
    }
    return (
        <Button onClick={upgradePlan} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 transition-all duration-300 group">
            <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Upgrade Plan
        </Button>
    )
}

export default Upgrade