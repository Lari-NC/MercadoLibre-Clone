import TemplateWithBack from "../../../components/navigation/TemplateWithBack";
import { useAuthContext } from "../../../hooks/AuthContext";
import ProductMobile from "../../../components/Product/ProductMobile";
import { StyleSheet, FlatList, View } from "react-native";

const LikedProducts = () => {
    const {user} = useAuthContext();
    const purchases= user.purchaseHistory.flatMap(purchase => 
        purchase.items.map(item => item.product))
    

return (
    <TemplateWithBack name="Purchases"> 
    <View style={styles.container}>
            <FlatList
                        data={purchases}
                        renderItem={({ item }) => <ProductMobile product={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                    />
                    </View>
            </TemplateWithBack>)
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderTopEndRadius: 8,
        marginTop: 16,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    grid: {
        alignItems: 'center',
        paddingBottom: 80,
        
    },
});


export default LikedProducts;