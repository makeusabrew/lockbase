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
          id: string
          label: string | null
          license_key: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          license_key?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          license_key?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_instances_license_key"
            columns: ["license_key"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["key"]
          }
        ]
      }
      licenses: {
        Row: {
          created_at: string
          idempotency_key: string | null
          key: string
          owner_email: string | null
          seats: number | null
          status: string | null
          support_expires_at: string | null
        }
        Insert: {
          created_at?: string
          idempotency_key?: string | null
          key?: string
          owner_email?: string | null
          seats?: number | null
          status?: string | null
          support_expires_at?: string | null
        }
        Update: {
          created_at?: string
          idempotency_key?: string | null
          key?: string
          owner_email?: string | null
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
