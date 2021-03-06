/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.ambari.logfeeder.container.docker;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Periodically re-register docker container metadata for {@link DockerContainerRegistry}
 * based on a time interval in seconds (property: logfeeder.container.registry.docker.interval, default: 5)
 */
public class DockerContainerRegistryMonitor implements Runnable {

  private static final Logger logger = LogManager.getLogger(DockerContainerRegistryMonitor.class);

  private final DockerContainerRegistry registry;

  public DockerContainerRegistryMonitor(DockerContainerRegistry registry) {
    this.registry = registry;
  }

  @Override
  public void run() {
    while (!Thread.currentThread().isInterrupted()) {
      try {
        logger.debug("Gather docker containers metadata ...");
        registry.register();
        Thread.sleep(1000 * registry.getWaitIntervalMin());
      } catch (Exception e) {
        logger.error("Error during gather docker containers metadata.", e);
      }
    }
  }
}
