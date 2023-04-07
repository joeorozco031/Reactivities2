
// Normal conventional way to name interface in React is to NOT include "I"  in name
// For example: IActivity
// In React, the standard way of naming an interface is without the "I"

export interface Activity {
    id: string
    title: string
    date: string    // Leave the date as string 
    description: string
    category: string
    city: string
    venue: string
  }
  