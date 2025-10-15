#!/usr/bin/env python3
"""
Backend API Testing Script for FastAPI endpoints
Tests the health endpoint, status creation, and status listing
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Use the backend URL from frontend environment
BACKEND_URL = "https://feature-restore-2.preview.emergentagent.com/api"

def test_health_endpoint():
    """Test GET /api/ endpoint"""
    print("Testing Health Endpoint: GET /api/")
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Health endpoint test PASSED")
                return True
            else:
                print(f"❌ Health endpoint test FAILED: Expected message 'Hello World', got {data}")
                return False
        else:
            print(f"❌ Health endpoint test FAILED: Expected status 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health endpoint test FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Health endpoint test FAILED: JSON decode error - {e}")
        return False

def test_create_status():
    """Test POST /api/status endpoint"""
    print("\nTesting Create Status: POST /api/status")
    
    # Test with valid payload
    test_payload = {"client_name": "test_client_backend"}
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/status", 
            json=test_payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_payload["client_name"]:
                    print("✅ Create status test PASSED")
                    return True, data
                else:
                    print(f"❌ Create status test FAILED: client_name mismatch")
                    return False, None
            else:
                missing_fields = [field for field in required_fields if field not in data]
                print(f"❌ Create status test FAILED: Missing fields {missing_fields}")
                return False, None
        else:
            print(f"❌ Create status test FAILED: Expected status 200, got {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status test FAILED: Request error - {e}")
        return False, None
    except json.JSONDecodeError as e:
        print(f"❌ Create status test FAILED: JSON decode error - {e}")
        return False, None

def test_create_status_invalid():
    """Test POST /api/status with invalid payload"""
    print("\nTesting Create Status with Invalid Payload: POST /api/status")
    
    # Test with empty payload
    try:
        response = requests.post(
            f"{BACKEND_URL}/status", 
            json={},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ Invalid payload test PASSED (422 validation error)")
            return True
        else:
            print(f"❌ Invalid payload test FAILED: Expected status 422, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Invalid payload test FAILED: Request error - {e}")
        return False

def test_list_status(created_item=None):
    """Test GET /api/status endpoint"""
    print("\nTesting List Status: GET /api/status")
    
    try:
        response = requests.get(f"{BACKEND_URL}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ List status test PASSED: Retrieved {len(data)} items")
                
                # If we have a created item, check if it's in the list
                if created_item:
                    found_item = any(item.get("id") == created_item.get("id") for item in data)
                    if found_item:
                        print("✅ Created item found in list")
                    else:
                        print("⚠️  Created item not found in list (may be expected if database is cleared)")
                
                return True
            else:
                print(f"❌ List status test FAILED: Expected array, got {type(data)}")
                return False
        else:
            print(f"❌ List status test FAILED: Expected status 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ List status test FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ List status test FAILED: JSON decode error - {e}")
        return False

def main():
    """Run all backend tests"""
    print("=" * 60)
    print("BACKEND API TESTING")
    print(f"Backend URL: {BACKEND_URL}")
    print("=" * 60)
    
    results = []
    
    # Test 1: Health endpoint
    health_result = test_health_endpoint()
    results.append(("Health Endpoint", health_result))
    
    # Test 2: Create status
    create_result, created_item = test_create_status()
    results.append(("Create Status", create_result))
    
    # Test 3: Invalid payload
    invalid_result = test_create_status_invalid()
    results.append(("Invalid Payload Validation", invalid_result))
    
    # Test 4: List status
    list_result = test_list_status(created_item)
    results.append(("List Status", list_result))
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return 0
    else:
        print("⚠️  Some backend tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())