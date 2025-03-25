import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../ui/Button"; // Import the Button component
import StoreCard from "../../ui/StoreCard";

function DashboardScreen({ navigation }) {
  const [imageError, setImageError] = useState(false);
  
  // Updated timestamp and user login from feedback
  const currentDateTime = "2025-03-25 13:42:17";
  const currentUserLogin = "rinae-del";
  
  const storeCredits = [
    {
      id: "1",
      storeName: "Coffee Shop",
      amount: "$75.00",
      logoUri: "https://placehold.co/600x400.png",
    },
    {
      id: "2",
      storeName: "Book Store",
      amount: "$45.50",
      logoUri: "https://placehold.co/600x400.png",
    },
    {
      id: "3",
      storeName: "Electronics",
      amount: "$120.25",
      logoUri: "https://placehold.co/600x400.png",
    },
    {
      id: "4",
      storeName: "Grocery Market",
      amount: "$60.00",
      logoUri: "https://placehold.co/600x400.png",
      status: "Limited Time Offer",
    },
    {
      id: "5",
      storeName: "Fashion Outlet",
      amount: "$95.75",
      logoUri: "https://placehold.co/600x400.png",
    },
  ];
  
  const user = {
    username: "Rinae Del",
    login: currentUserLogin,
    email: "rinae.del@example.com",
    phone: "+1 (123) 456-7890",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    storeCredit: "$250.00",
  };

  const handleQRCodeScan = () => {
    console.log("Open QR code scanner");
    navigation.navigate("MyQRCode");
  };

  const handleLogout = () => {
    console.log("Logout");
    navigation.navigate("SignIn");
  };
  
  const handlePlacesPress = () => {
    console.log("3 Places button pressed");
  };

  const handleViewAllPlaces = () => {
    console.log("View all places pressed");
    navigation.navigate('AllStoreCredit');
  };

  const handleMyProfile = () => {
    navigation.navigate('Profile');
  };

  const handleTransactions = () => {
    console.log('Transactions pressed');
    navigation.navigate('Transactions');
  };

  const handleMyStoreCredit = () => {
    console.log('My Store Credit pressed');
  };
  
  const isFirstItem = (index) => index === 0;
  const isLastItem = (index) => index === storeCredits.length - 1;
  
  const renderStoreCard = ({ item, index }) => {
    const cardContainerStyle = {
      marginLeft: isFirstItem(index) ? 16 : 12,
      marginRight: isLastItem(index) ? 16 : 0,
    };

    return (
      <StoreCard
        storeName={item.storeName}
        logoUri={item.logoUri}
        containerStyle={cardContainerStyle}
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleQRCodeScan}
          >
            <Ionicons name="qr-code-outline" size={28} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.profileImageContainer}>
            {imageError ? (
              <View
                style={[styles.profileImage, styles.fallbackImageContainer]}
              >
                <Ionicons name="person" size={50} color="#999" />
              </View>
            ) : (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
                onError={() => {
                  console.log("Image failed to load, showing fallback");
                  setImageError(true);
                }}
              />
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.cardContentContainer}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.userInfo}>{user.email}</Text>
              <Text style={styles.userInfo}>{user.phone}</Text>
            </View>
          </View>
        </View>
        
        
        <View style={styles.storeCreditCard}>
          <View style={styles.storeCreditLeft}>
            <Text style={styles.storeCreditLabel}>My Store Credit</Text>
            <Text style={styles.storeCreditAmount}>{user.storeCredit}</Text>
          </View>

          <View style={styles.placesButtonContainer}>
            <Button
              title={storeCredits.length + " Places"}
              type="outline"
              size="small"
              outlineColor="#333"
              outlineTextColor="#333"
              onPress={handleViewAllPlaces}
              style={styles.placesButton}
            />
          </View>
        </View>
        
        {/* Store Credits Section - Header only */}
        {storeCredits.length > 0 && (
          <View style={styles.storeCreditsSection}>
            <View style={styles.storeCreditsHeader}>
              <Text style={styles.storeCreditsTitle}>My Store Credit</Text>
              <TouchableOpacity onPress={handleViewAllPlaces}>
                <Text style={styles.viewAllText}>
                  View all {storeCredits.length} places
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Full width FlatList separated from its header for proper layout */}
        {storeCredits.length > 0 && (
          <View style={styles.fullWidthContainer}>
            <FlatList
              data={storeCredits}
              renderItem={renderStoreCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storeCardsContainer}
            />
          </View>
        )}
        <View style={styles.buttonsSection}>
          <Button 
            title="My QR Code"
            type="primary"
            onPress={handleQRCodeScan}
            style={styles.fullWidthButton}
          />
          <Button 
            title="My Profile"
            type="outline"
            outlineColor="#333"
            outlineTextColor="#333"
            onPress={handleMyProfile}
            style={styles.fullWidthButton}
          />
          <Button 
            title="Transactions"
            type="outline"
            outlineColor="#333"
            outlineTextColor="#333"
            onPress={handleTransactions}
            style={styles.fullWidthButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === "android" ? 40 : 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {},
  cardContainer: {
    position: "relative",
    paddingTop: 40,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    paddingTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "white",
  },
  fallbackImageContainer: {
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContentContainer: {
    alignItems: "center",
  },
  username: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    color: "#333",
    marginBottom: 8,
  },
  userInfo: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dateContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loginText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  storeCreditCard: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  storeCreditLeft: {
    flexDirection: "column",
  },
  storeCreditLabel: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#666",
  },
  storeCreditAmount: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: "#333",
    marginTop: 4,
  },
  placesButtonContainer: {
    width: 130,
  },
  placesButton: {
    width: 130,
  },
  storeCreditsSection: {
    marginTop: 30,
    marginBottom: 15,
  },
  storeCreditsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeCreditsTitle: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: "#333",
  },
  viewAllText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  fullWidthContainer: {
    marginHorizontal: -16, 
    marginBottom: 20,
  },
  storeCardsContainer: {
    paddingVertical: 10,
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
  buttonsSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: '100%',
  },

});

export default DashboardScreen;