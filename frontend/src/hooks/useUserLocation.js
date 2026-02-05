'use client'

import { useState, useEffect } from 'react'

export default function useUserLocation() {
  const [region, setRegion] = useState('US') // Default fallback
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const detectRegion = async () => {
      try {
        // Try to get location from browser geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              
              // Use a reverse geocoding service to get country code
              try {
                const geoRes = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                )
                const geoData = await geoRes.json()
                const countryCode = geoData.countryCode || 'US'
                setRegion(countryCode)
              } catch (geoError) {
                console.error('Geocoding error:', geoError)
                // Fallback to IP-based detection
                await detectByIP()
              }
              setLoading(false)
            },
            async (error) => {
              console.error('Geolocation error:', error)
              // Fallback to IP-based detection
              await detectByIP()
            }
          )
        } else {
          // Fallback to IP-based detection
          await detectByIP()
        }
      } catch (error) {
        console.error('Location detection error:', error)
        setRegion('US')
        setLoading(false)
      }
    }

    const detectByIP = async () => {
      try {
        // Use a free IP geolocation service
        const ipRes = await fetch('https://ipapi.co/json/')
        const ipData = await ipRes.json()
        const countryCode = ipData.country_code || 'US'
        setRegion(countryCode)
      } catch (ipError) {
        console.error('IP detection error:', ipError)
        setRegion('US')
      }
      setLoading(false)
    }

    detectRegion()
  }, [])

  return { region, loading }
}
