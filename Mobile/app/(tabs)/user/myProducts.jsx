import TemplateWithBack from "../../../components/navigation/TemplateWithBack";
import { useAuthContext } from "../../../hooks/AuthContext";
import ProductMobile from "../../../components/Product/ProductMobile";
import { StyleSheet, FlatList, View } from "react-native";

const LikedProducts = () => {
    const {user} = useAuthContext();
    const myProducts= user.products
    

return (
    <TemplateWithBack name="My products"> 
    <View style={styles.container}>
            <FlatList
                        data={myProducts}
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