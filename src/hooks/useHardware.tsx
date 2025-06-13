
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HardwareItem {
  id: string;
  name: string;
  type: string;
  serial_number: string;
  assigned_to: string | null;
  status: string;
  purchase_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useHardwareItems = () => {
  return useQuery({
    queryKey: ['hardware-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as HardwareItem[];
    }
  });
};

export const useHardwareItem = (id: string) => {
  return useQuery({
    queryKey: ['hardware-item', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_items')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as HardwareItem;
    },
    enabled: !!id
  });
};

export const useCreateHardware = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (hardware: Omit<HardwareItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('hardware_items')
        .insert([hardware])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hardware-items'] });
      toast({
        title: "Success!",
        description: "Hardware item has been added to inventory.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add hardware item. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateHardware = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<HardwareItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('hardware_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hardware-items'] });
      queryClient.invalidateQueries({ queryKey: ['hardware-item', data.id] });
      toast({
        title: "Success!",
        description: "Hardware item has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hardware item. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useDeleteHardware = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hardware_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hardware-items'] });
      toast({
        title: "Success!",
        description: "Hardware item has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove hardware item. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useHardwareStats = () => {
  const { data: items = [] } = useHardwareItems();
  
  return {
    totalItems: items.length,
    assignedItems: items.filter(item => item.status === 'Assigned').length,
    availableItems: items.filter(item => item.status === 'Available').length,
    retiredItems: items.filter(item => item.status === 'Retired').length,
    recentlyAdded: items.filter(item => {
      const createdDate = new Date(item.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length
  };
};
