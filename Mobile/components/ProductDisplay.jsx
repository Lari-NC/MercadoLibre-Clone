const ProductDisplay = (products) => {
    <Template name={user.name}> 
            <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductMobile product={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                    />
    </Template>
}