import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { SimpleBackground } from '../components/SimpleBackground';
import { colors, spacing, typography } from '../theme';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Reading } from '../types/database';
import { Ionicons } from '@expo/vector-icons';

export const HistoryScreen = () => {
  const { user } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPageSelector, setShowPageSelector] = useState(false);
  
  const itemsPerPageOptions = [10, 20, 50, 100];

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    if (!user) return;

    try {
      const { data, error } = await (supabase
        .from('readings') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setReadings(data);
      }
    } catch (error) {
      console.error('Error loading readings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadReadings();
  };

  const toggleFavorite = async (readingId: string, isFavorite: boolean) => {
    try {
      await (supabase
        .from('readings') as any)
        .update({ is_favorite: !isFavorite })
        .eq('id', readingId);

      setReadings((prev) =>
        prev.map((r) =>
          r.id === readingId ? { ...r, is_favorite: !isFavorite } : r
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Pagination logic
  const filteredReadings = readings.filter((r) =>
    r.question?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredReadings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReadings = filteredReadings.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
    setShowPageSelector(false);
  };

  const renderReading = ({ item, index }: { item: Reading; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <View
        style={[
          styles.readingCard,
          { backgroundColor: isEven ? colors.whiteAlpha[20] : colors.whiteAlpha[10] },
        ]}
      >
        <View style={styles.readingContent}>
          <Text style={styles.question} numberOfLines={1}>
            {item.question}
          </Text>
          <View style={styles.readingFooter}>
            <Text style={styles.date}>
              {new Date(item.created_at).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
              })}
            </Text>
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id, item.is_favorite)}
              >
                <Ionicons
                  name={item.is_favorite ? 'heart' : 'heart-outline'}
                  size={16}
                  color={colors.whiteAlpha[85]}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Ionicons
                name="checkmark"
                size={16}
                color={colors.whiteAlpha[85]}
                style={styles.icon}
              />
              <Ionicons
                name="chatbubble-outline"
                size={16}
                color={colors.whiteAlpha[85]}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GradientBackground />
      <SimpleBackground />
      
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}></Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search readings..."
            placeholderTextColor={colors.whiteAlpha[50]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color={colors.whiteAlpha[85]} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={colors.whiteAlpha[85]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedReadings}
        renderItem={renderReading}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.rebeccaPurple}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No readings yet</Text>
            <Text style={styles.emptySubtext}>
              Start a conversation with Kalfu to create your first reading
            </Text>
          </View>
        }
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <View style={styles.paginationInfo}>
            <TouchableOpacity
              style={styles.itemsPerPageButton}
              onPress={() => setShowPageSelector(!showPageSelector)}
            >
              <Text style={styles.itemsPerPageText}>{itemsPerPage} per page</Text>
              <Ionicons name="chevron-down" size={16} color={colors.whiteAlpha[85]} />
            </TouchableOpacity>
            <Text style={styles.pageInfo}>
              {startIndex + 1}-{Math.min(endIndex, filteredReadings.length)} of {filteredReadings.length}
            </Text>
          </View>
          
          <View style={styles.paginationControls}>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Ionicons name="chevron-back" size={20} color={currentPage === 1 ? colors.whiteAlpha[30] : colors.whiteAlpha[85]} />
            </TouchableOpacity>
            
            <Text style={styles.pageText}>{currentPage} of {totalPages}</Text>
            
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Ionicons name="chevron-forward" size={20} color={currentPage === totalPages ? colors.whiteAlpha[30] : colors.whiteAlpha[85]} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Items Per Page Selector */}
      {showPageSelector && (
        <View style={styles.itemsPerPageSelector}>
          {itemsPerPageOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.itemsPerPageOption, option === itemsPerPage && styles.itemsPerPageOptionSelected]}
              onPress={() => handleItemsPerPageChange(option)}
            >
              <Text style={[styles.itemsPerPageOptionText, option === itemsPerPage && styles.itemsPerPageOptionTextSelected]}>
                {option} per page
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.normal,
    color: colors.white,
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.base,
  },
  filterButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 22,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  readingCard: {
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  readingContent: {
    gap: spacing.xs,
  },
  question: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  readingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[60],
  },
  icons: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  icon: {
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing['3xl'],
  },
  emptyText: {
    fontSize: typography.fontSize.xl,
    color: colors.rebeccaPurple,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.fontSize.base,
    color: colors.whiteAlpha[85],
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.whiteAlpha[5],
    borderTopWidth: 1,
    borderTopColor: colors.whiteAlpha[10],
  },
  paginationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  itemsPerPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha[10],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    gap: spacing.xs,
  },
  itemsPerPageText: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[85],
  },
  pageInfo: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[70],
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pageButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 16,
  },
  pageButtonDisabled: {
    opacity: 0.3,
  },
  pageText: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[85],
    minWidth: 60,
    textAlign: 'center',
  },
  itemsPerPageSelector: {
    position: 'absolute',
    bottom: 60,
    left: spacing.md,
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 12,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.whiteAlpha[20],
  },
  itemsPerPageOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  itemsPerPageOptionSelected: {
    backgroundColor: colors.rebeccaPurple,
  },
  itemsPerPageOptionText: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[85],
  },
  itemsPerPageOptionTextSelected: {
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
});