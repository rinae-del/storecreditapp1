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

function AllStorePlacesScreen({ navigation }) {
  // Current date and time from prompt
  const currentDateTime = "2025-03-25 14:03:20";
  const currentUserLogin = "rinae-del";
  
  // Sample expanded store data
  const storeCredits = [
    { 
      id: '1', 
      storeName: 'Coffee Shop', 
      amount: '$75.00', 
      logoUri: 'https://placehold.co/600x400.png',
      lastVisited: '2025-03-22' 
    },
    { 
      id: '2', 
      storeName: 'Book Store', 
      amount: '$45.50', 
      logoUri: 'https://placehold.co/600x400.png',
      lastVisited: '2025-03-20'
    },
    { 
      id: '3', 
      storeName: 'Electronics', 
      amount: '$120.25', 
      logoUri: 'https://placehold.co/600x400.png',
      lastVisited: '2025-03-18'
    },
    { 
      id: '4', 
      storeName: 'Grocery Market', 
      amount: '$60.00', 
      logoUri: 'https://placehold.co/600x400.png',
      status: 'Limited Time Offer',
      lastVisited: '2025-03-15'
    },
    
  ];
  
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Render each store card item with custom subtitle
  const renderStoreCard = ({ item }) => {
    return (
      <StoreCard 
        storeName={item.storeName}
        logoUri={item.logoUri}
        containerStyle={styles.storeCard}
        subtitle={
          <View>
            <Text style={styles.storeAmount}>
              You have{" "}
              <Text style={{ fontFamily: "MontserratBold" }}>
                {item.amount}
              </Text>{" "}
              store credit
            </Text>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with back button, centered title, and profile icon */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleGoBack}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My Store Credit</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleProfilePress}
          >
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
        
        {/* Total credit summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Total Store Credit</Text>
          <Text style={styles.summaryAmount}>
            ${storeCredits.reduce((total, store) => {
              // Extract numeric value from amount string
              const amount = parseFloat(store.amount.replace('$', ''));
              return total + amount;
            }, 0).toFixed(2)}
          </Text>
          <Text style={styles.summaryInfo}>Across {storeCredits.length} places</Text>
        </View>
        
        {/* Store credits list */}
        <FlatList
          data={storeCredits}
          renderItem={renderStoreCard}
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
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontFamily: 'MontserratBold',
    fontSize: 30,
    color: '#333',
    marginBottom: 8,
  },
  summaryInfo: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  storeCard: {
    marginBottom: 15,
    width: '100%',
  },
  storeAmount: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#666",
  },
  storeStatus: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    color: "#FF9800",
    marginTop: 4,
  },
  lastVisited: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    color: "#999",
    marginTop: 4,
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

export default AllStorePlacesScreen;