package com.example.demo.DTO;

import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Product")
@Data

public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Many-to-One relationship with Category
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryModel category;  // Use CategoryModel for proper relationship mapping

    private int shopId;

    private String productName;

    private float price;

    private String description;

    private String productImage;

    private int stockQuantity;

    private double productRating;


    public ProductModel() {
    }

    public ProductModel(int id, double productRating, int stockQuantity, String productImage, String description, float price, String productName, CategoryModel category, int shopId) {
        this.id = id;
        this.productRating = productRating;
        this.stockQuantity = stockQuantity;
        this.productImage = productImage;
        this.description = description;
        this.price = price;
        this.productName = productName;
        this.category = category;
        this.shopId = shopId;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getProductRating() {
        return productRating;
    }

    public void setProductRating(double productRating) {
        this.productRating = productRating;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }

    public CategoryModel getCategory() {
        return category;
    }

    public void setCategory(CategoryModel category) {
        this.category = category;
    }
}
