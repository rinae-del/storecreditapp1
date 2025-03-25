import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoreCard from '../../ui/StoreCard';

function TransactionsScreen({ navigation }) {
  // Current date and time from prompt
  const currentDateTime = "2025-03-25 14:17:09";
  const currentUserLogin = "rinae-del";
  
  // Sample transactions data with timestamps
  const transactions = [
    { 
      id: '1', 
      storeName: 'Coffee Shop', 
      amount: '$15.00',
      type: 'earned',
      timestamp: '2025-03-25 14:10:09', // 7 minutes ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '2', 
      storeName: 'Book Store', 
      amount: '$25.50',
      type: 'redeemed',
      timestamp: '2025-03-25 13:57:09', // 20 minutes ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '3', 
      storeName: 'Electronics', 
      amount: '$50.25',
      type: 'earned',
      timestamp: '2025-03-25 13:32:09', // 45 minutes ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '4', 
      storeName: 'Grocery Market', 
      amount: '$35.00',
      type: 'redeemed',
      timestamp: '2025-03-25 12:17:09', // 2 hours ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '5', 
      storeName: 'Fashion Outlet', 
      amount: '$45.75',
      type: 'earned',
      timestamp: '2025-03-25 10:17:09', // 4 hours ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '6', 
      storeName: 'Home Goods', 
      amount: '$75.00',
      type: 'earned',
      timestamp: '2025-03-24 14:17:09', // 1 day ago
      logoUri: 'https://placehold.co/600x400.png',
    },
    { 
      id: '7', 
      storeName: 'Sports Equipment', 
      amount: '$30.30',
      type: 'redeemed',
      timestamp: '2025-03-23 14:17:09', // 2 days ago
      logoUri: 'https://placehold.co/600x400.png',
    },
  ];
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Calculate time difference in minutes, hours, or days
  const getTimeAgo = (timestamp) => {
    // Parse timestamps to Date objects
    const transactionTime = new Date(timestamp.replace(' ', 'T'));
    const currentTime = new Date(currentDateTime.replace(' ', 'T'));
    
    // Calculate time difference in milliseconds
    const timeDiff = currentTime - transactionTime;
    
    // Convert to minutes
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesDiff < 60) {
      return `${minutesDiff} min ago`;
    } else if (minutesDiff < 1440) { // Less than 24 hours
      const hours = Math.floor(minutesDiff / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(minutesDiff / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  // Render each transaction card
  const renderTransactionCard = ({ item }) => {
    const isEarned = item.type === 'earned';
    const transactionText = isEarned 
      ? `Earned ${item.amount} ${getTimeAgo(item.timestamp)}`
      : `Redeemed ${item.amount} ${getTimeAgo(item.timestamp)}`;
    
    return (
      <StoreCard 
        storeName={item.storeName}
        logoUri={item.logoUri}
        containerStyle={styles.transactionCard}
        subtitle={
          <Text style={[
            styles.transactionText,
            isEarned ? styles.earnedText : styles.redeemedText
          ]}>
            {transactionText}
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with back button and centered title */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleGoBack}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Transactions</Text>
          </View>
          
          {/* Empty view for balanced spacing */}
          <View style={styles.headerButton} />
        </View>
        
        {/* Summary of transactions */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Earned</Text>
              <Text style={[styles.summaryAmount, styles.earnedText]}>
                ${transactions
                  .filter(t => t.type === 'earned')
                  .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0)
                  .toFixed(2)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Redeemed</Text>
              <Text style={[styles.summaryAmount, styles.redeemedText]}>
                ${transactions
                  .filter(t => t.type === 'redeemed')
                  .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Transactions list */}
        <FlatList
          data={transactions}
          renderItem={renderTransactionCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}

        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 50,
    position: 'relative',
  },
  headerButton: {
    padding: 8,
    width: 44, // Fixed width for balanced spacing
    zIndex: 1,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryAmount: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#DDD',
  },
  sectionTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  transactionCard: {
    marginBottom: 15,
    width: '100%',
  },
  transactionText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
  },
  earnedText: {
    color: '#4CAF50', // Green for earned
  },
  redeemedText: {
    color: '#F44336', // Red for redeemed
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default TransactionsScreen;