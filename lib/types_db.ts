export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      license_instances: {
        Row: {
          created_at: string
          email: string | null
          id: string
          license_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          license_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          license_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_instances_license_id_fkey"
            columns: ["license_id"]
            referencedRelation: "licenses"
            referencedColumns: ["checkout_id"]
          }
        ]
      }
      licenses: {
        Row: {
          checkout_id: string
          created_at: string
          expires_at: string | null
          is_live: boolean | null
          key: string
          owner_email: string | null
          product: string | null
          seats: number | null
          status: string | null
          support_expires_at: string | null
        }
        Insert: {
          checkout_id: string
          created_at?: string
          expires_at?: string | null
          is_live?: boolean | null
          key?: string
          owner_email?: string | null
          product?: string | null
          seats?: number | null
          status?: string | null
          support_expires_at?: string | null
        }
        Update: {
          checkout_id?: string
          created_at?: string
          expires_at?: string | null
          is_live?: boolean | null
          key?: string
          owner_email?: string | null
          product?: string | null
          seats?: number | null
          status?: string | null
          support_expires_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
